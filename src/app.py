import os
import json
import re
import tempfile
import fitz  # PyMuPDF for PDF text extraction
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set up API key securely (replace with your actual API key in production)
os.environ["GOOGLE_API_KEY"] = "AIzaSyC_p3l8afWDH5J0RzI6sCeJZ6dXBw20Lac"
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Path to the benchmark criteria JSON file
BENCHMARK_FILE_PATH = "benchmark_criteria.json"

# Global variable to store candidate analysis results
candidate_db = []
# Global variable to store the latest full analysis (StructuredResume + Scoring)
latest_analysis = None

def extract_text_from_pdf(pdf_path):
    try:
        doc = fitz.open(pdf_path)
        text = "\n".join([page.get_text("text") for page in doc])
        return text.strip()  # Remove leading/trailing spaces
    except Exception as e:
        app.logger.error(f"❌ Error extracting text: {e}")
        return None

def extract_resume_details(resume_text, role="software roles"):
    if not resume_text:
        return {"Error": "No resume text extracted. Check the PDF content."}

    prompt = f"""
    Extract structured details from the following resume. Return only JSON.

    Resume: {resume_text}

    *Required JSON Output Format:*
    ```json
    {{
      "Name": "Full Name",
      "Age": "If mentioned, else estimate based on education/work timeline",
      "Years of Experience": "Sum of internships, jobs, and major projects",
      "Number of Projects": 0,
      "Projects": [
        {{
          "Title": "Project Name",
          "Description": "Brief project description",
          "Skills Used": ["Skill1", "Skill2"],
          "Role": "What the candidate did in the project",
          "Duration": "If available",
          "Relevance Score": "How relevant this project is to {role} (scale: 1-10)"
        }}
      ],
      "Number of Work Experiences": 0,
      "Work Experience": [
        {{
          "Company": "Company Name",
          "Role": "Job Title",
          "Description": "Responsibilities",
          "Duration": "Time Period",
          "Relevance Score": "How relevant this job is to {role} (scale: 1-10)"
        }}
      ],
      "Number of Internships": 0,
      "Internships": [
        {{
          "Company": "Company Name",
          "Role": "Internship Role",
          "Description": "Short summary",
          "Duration": "If available",
          "Relevance Score": "How relevant this internship is to {role} (scale: 1-10)"
        }}
      ],
      "Skills": {{
        "Technical Skills": ["Skill1", "Skill2"],
        "Soft Skills": ["Skill1", "Skill2"]
      }},
      "Education": [
        {{
          "Institution": "University Name",
          "Degree": "Degree Name",
          "Years": "Year of Study"
        }}
      ],
      "Certifications": ["Cert1", "Cert2"],
      "Contact Information": {{
        "Phone": "If found",
        "Email": "If found",
        "Address": "If found"
      }},
      "Publications & Research": ["Paper1", "Paper2"],
      "Achievements & Awards": ["Award1", "Award2"],
      "Languages Spoken": ["Language1", "Language2"],
      "Inferred Details": {{
        "Estimated Age": "If missing, estimate based on university start year",
        "Estimated Experience": "If missing, estimate based on projects and internships",
        "Internships Treated as Work Experience": "List research-based internships that count as work"
      }},
      "ImprovementSuggestions": ["Add more quantifiable achievements", "Include specific technical skills", "Strengthen your professional summary"],
      "MissingKeywords": ["Project Management", "Agile Methodology", "Team Leadership"]
    }}
    ```
    """
    try:
        model = genai.GenerativeModel("gemini-1.5-pro-latest")
        response = model.generate_content(prompt)
        app.logger.info("🔹 Raw AI Response:\n" + response.text)

        try:
            structured_data = json.loads(response.text.strip())
        except json.JSONDecodeError:
            # Fallback: extract JSON using regex if extra text is present
            json_match = re.search(r"\{.*\}", response.text, re.DOTALL)
            if json_match:
                structured_data = json.loads(json_match.group(0))
            else:
                structured_data = {"Error": "AI response could not be parsed as JSON."}

        return structured_data
    except Exception as e:
        app.logger.error(f"❌ Error in extract_resume_details: {e}")
        return {"Error": str(e)}

def calculate_relevance_score(resume, benchmark):
    score = 0
    max_possible = 0

    # Check Technical Skills
    benchmark_skills = set(benchmark.get("Skills", {}).get("Technical Skills", []))
    resume_skills = set(resume.get("Skills", {}).get("Technical Skills", []))
    skill_match = len(resume_skills & benchmark_skills)
    score += skill_match * 10  # Each matching skill adds 10 points
    max_possible += len(benchmark_skills) * 10  

    # Projects relevance
    for project in resume.get("Projects", []):
        score += project.get("Relevance Score", 0)
        max_possible += 10  # Max 10 per project

    # Work Experience relevance
    for work in resume.get("Work Experience", []):
        score += work.get("Relevance Score", 0)
        max_possible += 10

    # Internship relevance
    for internship in resume.get("Internships", []):
        score += internship.get("Relevance Score", 0)
        max_possible += 10

    return score, max_possible

@app.route('/upload', methods=['POST'])
def upload_and_process_resume():
    global latest_analysis

    try:
        if 'file' not in request.files:
            return jsonify({"Error": "No file part in the request."}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"Error": "No file selected."}), 400

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            file.save(tmp.name)
            temp_file_path = tmp.name

        resume_text = extract_text_from_pdf(temp_file_path)
        if not resume_text:
            os.remove(temp_file_path)
            return jsonify({"Error": "Failed to extract text from the PDF."}), 500

        structured_resume = extract_resume_details(resume_text)
        if "Error" in structured_resume:
            os.remove(temp_file_path)
            return jsonify({
                "Error": "Failed to extract resume details.",
                "Details": structured_resume.get("Error")
            }), 500

        try:
            with open(BENCHMARK_FILE_PATH, "r") as benchmark_file:
                benchmark = json.load(benchmark_file)
        except Exception as e:
            os.remove(temp_file_path)
            app.logger.error(f"❌ Error loading benchmark criteria: {e}")
            return jsonify({"Error": "Failed to load benchmark criteria."}), 500

        total_score, max_score = calculate_relevance_score(structured_resume, benchmark)
        percentage_score = (total_score / max_score) * 100 if max_score > 0 else 0

        # The "result_data" that the Dashboard needs
        result_data = {
            "StructuredResume": structured_resume,
            "Scoring": {
                "Total Score": total_score,
                "Max Score": max_score,
                "Relevance Percentage": round(percentage_score, 2)
            }
        }

        # Save the entire analysis so /api/dashboard can return it
        latest_analysis = result_data

        # Meanwhile, create a simpler "candidate" record for the Recruiter Dashboard
        candidate = {
            "id": len(candidate_db) + 1,
            "name": structured_resume.get("Name", "Unknown"),
            "role": "Software Developer",  # or parse from resume
            "atsScore": round(percentage_score, 2),
            "skills": structured_resume.get("Skills", {}).get("Technical Skills", [])
        }
        if percentage_score >= 85:
            candidate["status"] = "Shortlisted"
        elif percentage_score >= 60:
            candidate["status"] = "Under Review"
        else:
            candidate["status"] = "New"

        candidate_db.append(candidate)

        os.remove(temp_file_path)

        app.logger.info("🔹 Analysis Result:\n" + json.dumps(result_data, indent=2))
        app.logger.info("🔹 Candidate added:\n" + json.dumps(candidate, indent=2))

        return jsonify(result_data)

    except Exception as e:
        app.logger.error(f"❌ Unexpected error: {e}")
        return jsonify({"Error": "An unexpected error occurred.", "Details": str(e)}), 500

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    # Return the entire analysis object for the "Dashboard" page
    if latest_analysis:
        return jsonify(latest_analysis)
    else:
        return jsonify({"Error": "No analysis available. Please upload a resume first."}), 404

@app.route('/api/candidates', methods=['GET'])
def get_candidates():
    # Return the simpler list of candidate objects for the recruiter dashboard
    return jsonify(candidate_db)

if __name__ == '__main__':
    app.run(debug=True)
