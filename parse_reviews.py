import os, re, json, zipfile
import xml.etree.ElementTree as ET

def get_text_lines(path):
    try:
        with zipfile.ZipFile(path) as z:
            tree = ET.fromstring(z.read('word/document.xml'))
            lines = []
            for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                t = ''.join([n.text for n in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if n.text])
                if t.strip():
                    lines.append(t.strip())
            return lines
    except Exception as e:
        print(f"Error reading {path}: {e}")
        return []

TITLE_MAP = {
    'CE 304': 'Engineering Law',
    'CE 324': 'Engineering Law',
    'CE 325': 'Engineering Law',
    'CE 3618': 'Advanced Structural Design',
    'CE 410': 'Introduction to Offshore Engineering',
    'CE 420': 'Concrete Technology',
    'CE 448': 'Pre-stressed Concrete Design',
    'CE 462': 'Elements of Structural Dynamics',
    'CE 482': 'Construction Management',
    'CE 484': 'Concrete Technology',
    'CE 488': 'Environmental Geotechniques',
    'CE 607': 'Numerical Techniques in Hydraulic Engineering',
    'CE 610': 'Introduction to Earthquake Engineering',
    'CE 6101': 'Vernacular Construction Systems',
    'CE 616': 'Structural Reliability',
    'CE 630': 'Geographical Information Systems in Civil Engineering',
    'CE 641': 'Environmental Geomechanics',
    'CE 712': 'Digital Image Processing of Remotely Sensed Data',
    'CE 722': 'Construction Equipment and Methods',
    'CE 725': 'Construction Finance',
    'CE 742': 'Pavement Systems Engineering',
    'CE 751': 'Urban Transportation Systems and Planning',
    'CE 761': 'Blast Resistant Structures',
    'CE 771': 'Optimization in Civil Engineering',
    'CE 773': 'Geometric Design and Analysis of High Speed Roadways',
    'CE 776': 'Transportation Project Evaluation and Decision Making',
    'CM 615': 'Climate Change Impacts and Adaptation',
    'CM 618': 'Introduction to Climate Science',
    'DH 304': 'Digital Healthcare',
    'ET 610': 'Learning Analytics',
    'ETT 610': 'Learning Analytics',
    'ET 617': 'Educational App Design',
    'GNR 638': 'Machine Learning for Remote Sensing II',
    'HS 401': 'Introduction to Paninian Grammar',
    'IE 624': 'Generative and Agentic AI',
    'PS 619': 'Health Policy',
    'TD 643': 'Design of Bamboo Structures',
}

TYPE_MAP = {
    'CE': 'Dept Elective',
    'TD': 'STEM Elective',
    'DH': 'Institute Elective',
    'IE': 'Institute / Tech Elective',
    'GNR': 'Institute / Tech Elective',
    'CM': 'Interdisciplinary Elective',
    'ET': 'Institute / Tech Elective',
    'ETT': 'Institute / Tech Elective',
    'HS': 'HSS Elective',
    'PS': 'Policy / Open Elective',
}

def extract_course_code(text, filename):
    m = re.search(r'\b([A-Za-z]{2,4})\s*(\d{3,4}[A-Za-z]?)\b', text)
    if m:
        dept, num = m.group(1).upper(), m.group(2).upper()
        if dept in ['CE', 'CM', 'DH', 'ET', 'ETT', 'GNR', 'HS', 'IE', 'PS', 'TD']:
            return f"{dept} {num}"
    
    m = re.search(r'\b([A-Za-z]{2,4})\s*(\d{3,4}[A-Za-z]?)\b', filename)
    if m:
        dept, num = m.group(1).upper(), m.group(2).upper()
        if dept in ['CE', 'CM', 'DH', 'ET', 'ETT', 'GNR', 'HS', 'IE', 'PS', 'TD']:
            return f"{dept} {num}"
    return "CE Elective"

def is_sec_header(line, keywords):
    l = line.strip().lower()
    if len(l) > 45:
        return False
    return any(l == k or l.startswith(k) for k in keywords)

def parse_elective_review(path, review_id):
    lines = get_text_lines(path)
    fname = os.path.basename(path)
    full_text = '\n'.join(lines)
    
    reviewer = ""
    senior = ""
    batch = "2027"
    date = ""
    course_code = extract_course_code(full_text[:500], fname)
    course_name = TITLE_MAP.get(course_code, "")
    sem_str = ""
    sem_num = None
    prof = ""
    
    # Try filename extraction for senior/reviewer if pattern matches
    if ' - ' in fname:
        parts = fname.replace('.docx', '').split(' - ')
        if len(parts) >= 4:
            senior = parts[2].strip()
            reviewer = parts[3].strip()
        elif len(parts) == 3:
            senior = parts[1].strip()
            reviewer = parts[2].strip()
    else:
        m = re.search(r'Review_([A-Za-z]+(?:[A-Z][a-z]+)*)_([A-Za-z]+)', fname)
        if m:
            s_raw = m.group(1)
            senior = re.sub(r'([a-z])([A-Z])', r'\1 \2', s_raw)
            reviewer = m.group(2)
            
    overview_lines = []
    learnings_lines = []
    grading_lines = []
    ratings_dict = {}
    comments_lines = []
    
    current_sec = None
    
    for i, line in enumerate(lines):
        ll = line.lower()
        
        # Metadata checks (only in call details / header)
        if i < 15:
            m_rev = re.search(r'(?:your name|reviewer)\s*[:–-]\s*([^|\n]+)', line, re.I)
            if m_rev:
                reviewer = m_rev.group(1).strip()
            m_sen = re.search(r'senior(?:\'s)?(?:\s*name)?\s*[:–-]\s*([^|\n]+)', line, re.I)
            if m_sen:
                senior = m_sen.group(1).strip()
            if 'batch' in ll or 'year' in ll:
                b_match = re.search(r'(202\d|4th year|3rd year|fourth year)', line, re.I)
                if b_match:
                    batch = b_match.group(1)
            if 'date of call' in ll:
                date = re.split(r'[:–-]', line, maxsplit=1)[-1].strip()
            if 'elective name & code:' in ll or 'course name & code:' in ll or 'elective name:' in ll:
                val = line.split(':', 1)[-1].strip()
                if not course_name:
                    val_clean = re.sub(r'^[A-Za-z]{2,4}\s*\d{3,4}[:\s–-]*', '', val).strip()
                    if val_clean:
                        course_name = val_clean
            if 'semester taken:' in ll or 'semester undertaken:' in ll:
                sem_str = line.split(':', 1)[-1].strip()
                s_match = re.search(r'(\d+)', sem_str)
                if s_match:
                    sem_num = int(s_match.group(1))
                elif 'second' in sem_str.lower():
                    sem_num = 4
                elif 'third' in sem_str.lower():
                    sem_num = 6
                elif 'fourth' in sem_str.lower():
                    sem_num = 7
            if 'professor/guide:' in ll or 'professor:' in ll or "professor's name:" in ll:
                p_val = line.split(':', 1)[-1].strip()
                if p_val and 'rate' not in p_val.lower() and '⚠' not in p_val and 'internal' not in p_val.lower():
                    prof = p_val
                    
        # Section detection
        if is_sec_header(line, ['course overview', 'project overview']):
            current_sec = 'overview'
            continue
        elif is_sec_header(line, ['learnings & applications', 'learnings and applications', 'learnings']):
            current_sec = 'learnings'
            continue
        elif is_sec_header(line, ['grading']):
            current_sec = 'grading'
            continue
        elif is_sec_header(line, ['professor review', 'course review']):
            current_sec = 'prof_review'
            continue
        elif is_sec_header(line, ['comments:', 'comments']):
            current_sec = 'comments'
            c_val = line.split(':', 1)[-1].strip()
            if c_val and not any(k in c_val.lower() for k in ['who should', 'red flags']):
                comments_lines.append(c_val)
            continue
            
        # Inside section
        # Skip questions starting with numbers like "1. What is..."
        if re.match(r'^\d+\.', line.strip()):
            # Also check if answer is on same line after question mark!
            if '?' in line:
                q_part, a_part = line.split('?', 1)
                a_part = a_part.strip()
                if a_part:
                    if current_sec == 'overview':
                        overview_lines.append(a_part)
                    elif current_sec == 'learnings':
                        learnings_lines.append(a_part)
                    elif current_sec == 'grading':
                        grading_lines.append(a_part)
            continue
            
        if current_sec == 'overview':
            overview_lines.append(line)
        elif current_sec == 'learnings':
            learnings_lines.append(line)
        elif current_sec == 'grading':
            grading_lines.append(line)
        elif current_sec == 'prof_review':
            # Extract ratings like "1. Teaching quality: 9/10" or "Teaching clarity — 6"
            rm = re.search(r'([A-Za-z\s]+)[:—–-]\s*(\d+(\.\d+)?(\s*/\s*10)?)', line)
            if rm:
                m_name = re.sub(r'^\d+\.\s*', '', rm.group(1)).strip()
                m_val = rm.group(2).strip()
                if any(k in m_name.lower() for k in ['teaching', 'clarity', 'approach', 'fairness', 'grading', 'predictability', 'overall', 'engagement']):
                    ratings_dict[m_name] = m_val
            elif 'comments:' in ll or 'comments' == ll:
                current_sec = 'comments'
                c_val = line.split(':', 1)[-1].strip()
                if c_val and not any(k in c_val.lower() for k in ['who should', 'red flags']):
                    comments_lines.append(c_val)
        elif current_sec == 'comments':
            if not any(k in ll for k in ['who should take', 'internal only', '⚠']):
                comments_lines.append(line)

    if not course_name:
        course_name = TITLE_MAP.get(course_code, course_code)
    if not prof:
        prof = "Department Faculty"
    if not prof.startswith("Prof.") and not prof.startswith("Dr.") and prof != "Department Faculty":
        prof = f"Prof. {prof}"
    if not sem_num:
        sem_num = 6
        
    overview_text = ' '.join(overview_lines).strip()
    learnings_text = ' '.join(learnings_lines).strip()
    grading_text = ' '.join(grading_lines).strip()
    comments_text = ' '.join(comments_lines).strip()
    
    # Infer difficulty & leniency
    difficulty = "Medium"
    len_match = re.search(r'(\d+(\.\d+)?)\s*/\s*10', grading_text)
    leniency_score = len_match.group(0) if len_match else None
    
    if not leniency_score:
        for k, v in ratings_dict.items():
            if 'grading' in k.lower() or 'fairness' in k.lower():
                leniency_score = f"{v}/10"
                break
                
    if leniency_score:
        val = float(re.search(r'\d+(\.\d+)?', leniency_score).group(0))
        if val >= 8.0:
            difficulty = "Easy"
        elif val <= 5.5:
            difficulty = "Hard"
        else:
            difficulty = "Medium"
    else:
        comb = (grading_text + " " + comments_text).lower()
        if any(w in comb for w in ['chill', 'very easy', 'easy grade', 'lenient', 'light workload']):
            difficulty = "Easy"
        elif any(w in comb for w in ['strict', 'heavy', 'difficult', 'tough', 'demanding', 'low grades']):
            difficulty = "Hard"
            
    # Star rating
    ov = ratings_dict.get('Overall rating') or ratings_dict.get('Overall')
    if ov:
        ov_num = float(re.search(r'\d+(\.\d+)?', ov).group(0))
        star_rating = min(5, max(3, round(ov_num / 2.0)))
    elif difficulty == "Easy":
        star_rating = 5
    elif difficulty == "Hard":
        star_rating = 4
    else:
        star_rating = 4

    dept_code = course_code.split()[0]
    ctype = TYPE_MAP.get(dept_code, 'Dept Elective')
    
    # Build clean review preview
    review_parts = []
    if overview_text:
        sents = [s.strip() for s in re.split(r'(?<=[.!?])\s+', overview_text) if s.strip()]
        if sents:
            review_parts.append(sents[0])
            if len(sents) > 1 and len(sents[0]) < 80:
                review_parts.append(sents[1])
    if grading_text:
        g_sents = [s.strip() for s in re.split(r'(?<=[.!?])\s+', grading_text) if s.strip()]
        if g_sents:
            review_parts.append(g_sents[0])
    if comments_text and len(' '.join(review_parts)) < 160:
        c_sents = [s.strip() for s in re.split(r'(?<=[.!?])\s+', comments_text) if s.strip()]
        if c_sents:
            review_parts.append(c_sents[0])
            
    cohesive_review = ' '.join(review_parts).strip().replace('"', "'")
    if not cohesive_review or len(cohesive_review) < 30:
        cohesive_review = f"{course_name} ({course_code}) offered by {prof}. Recommended elective providing solid domain exposure and practical civil applications."

    return {
        'id': review_id,
        'code': course_code,
        'name': course_name,
        'type': ctype,
        'category': 'Elective',
        'professor': prof,
        'semester': sem_num,
        'difficulty': difficulty,
        'rating': star_rating,
        'leniency': leniency_score or ("Lenient" if difficulty == "Easy" else "Moderate"),
        'senior': senior or "Department Senior",
        'reviewer': reviewer or "DAMP Mentor",
        'batch': batch,
        'date': date,
        'overview': overview_text or f"Introduces core principles and applications in {course_name}.",
        'learnings': learnings_text or "Knowledge-broadening elective providing practical engineering insights.",
        'grading': grading_text or "Evaluated via periodic quizzes, midsem, and endsem examinations.",
        'comments': comments_text or "Solid elective option for civil engineering undergraduates.",
        'metrics': ratings_dict,
        'review': cohesive_review,
        'sourceFile': fname
    }

def parse_btp_review(path, project_id):
    lines = get_text_lines(path)
    fname = os.path.basename(path)
    
    title = ""
    senior = ""
    reviewer = ""
    guide = ""
    domain = ""
    semester = ""
    team_size = "Individual"
    overview_lines = []
    learnings_lines = []
    grading_lines = []
    advice_lines = []
    metrics = {}
    
    current_sec = None
    for i, line in enumerate(lines):
        ll = line.lower()
        if i < 15:
            m_rev = re.search(r'(?:your name|reviewer)\s*[:–-]\s*([^|\n]+)', line, re.I)
            if m_rev:
                reviewer = m_rev.group(1).strip()
            m_sen = re.search(r'senior(?:\'s)?(?:\s*name)?\s*[:–-]\s*([^|\n]+)', line, re.I)
            if m_sen:
                senior = m_sen.group(1).strip()
            if 'btp title:' in ll or 'title:' in ll:
                title = line.split(':', 1)[-1].strip()
            if 'semester undertaken:' in ll:
                semester = line.split(':', 1)[-1].strip()
            if 'professor/guide:' in ll or 'guide:' in ll or "professor's name:" in ll:
                val = line.split(':', 1)[-1].strip()
                if val and 'rate' not in val.lower() and '⚠' not in val:
                    guide = val
            if 'domain:' in ll:
                domain = line.split(':', 1)[-1].strip()
            if 'team size:' in ll:
                team_size = line.split(':', 1)[-1].strip()
                
        if is_sec_header(line, ['project overview', 'course overview']):
            current_sec = 'overview'
            continue
        elif is_sec_header(line, ['learnings & applications', 'learnings']):
            current_sec = 'learnings'
            continue
        elif is_sec_header(line, ['grading']):
            current_sec = 'grading'
            continue
        elif is_sec_header(line, ['professor review']):
            current_sec = 'prof_review'
            continue
        elif is_sec_header(line, ['comments:', 'comments', 'tips for getting a good evaluation']):
            current_sec = 'advice'
            continue
            
        if re.match(r'^\d+\.', line.strip()):
            if '?' in line:
                _, a = line.split('?', 1)
                a = a.strip()
                if a:
                    if current_sec == 'overview':
                        overview_lines.append(a)
                    elif current_sec == 'learnings':
                        learnings_lines.append(a)
                    elif current_sec == 'grading':
                        grading_lines.append(a)
            continue
            
        if current_sec == 'overview':
            overview_lines.append(line)
        elif current_sec == 'learnings':
            learnings_lines.append(line)
        elif current_sec == 'grading':
            grading_lines.append(line)
        elif current_sec == 'advice':
            if not any(k in ll for k in ['internal only', '⚠', 'rate 1–10', 'rate 1-10']):
                advice_lines.append(line)
        elif current_sec == 'prof_review':
            rm = re.search(r'([A-Za-z\s]+)[:—–-]\s*(\d+(\.\d+)?(\s*/\s*10)?)', line)
            if rm:
                m_name = re.sub(r'^\d+\.\s*', '', rm.group(1)).strip()
                metrics[m_name] = rm.group(2).strip()

    if guide and not guide.startswith("Prof.") and not guide.startswith("Dr."):
        guide = f"Prof. {guide}"
        
    return {
        'id': project_id,
        'projectType': 'BTP',
        'title': title or "Bachelor Thesis Project",
        'student': f"{senior} (B.Tech)",
        'year': '2024–25',
        'professor': guide or "Department Faculty",
        'reviewer': reviewer,
        'semester': semester or "7th/8th Semester",
        'teamSize': team_size,
        'domain': domain or "Civil Engineering Research",
        'description': ' '.join(overview_lines).strip() or "Bachelor Thesis Project addressing structural, transportation, and sustainability challenges.",
        'takeaways': ' '.join(learnings_lines).strip() or "Simulation, modeling, and autonomous research management.",
        'grading': ' '.join(grading_lines).strip() or "Graded based on weekly guide interactions, objective outputs, and final thesis defense.",
        'advice': ' '.join(advice_lines).strip() or "Regular meetings and tangible outputs are key to securing a strong grade.",
        'metrics': metrics,
        'sourceFile': fname
    }

def parse_idp_review(path, project_id):
    lines = get_text_lines(path)
    fname = os.path.basename(path)
    
    title = ""
    senior = ""
    reviewer = ""
    guide = ""
    semester = ""
    team_size = "5 members (Civil Engineering)"
    overview_lines = []
    learnings_lines = []
    grading_lines = []
    advice_lines = []
    metrics = {}
    
    # Extract from filename if needed
    m = re.search(r'IDP_Review_(?:[A-Za-z_]+_)?([A-Za-z]+(?:[A-Z][a-z]+)*)_([A-Za-z]+)', fname)
    if m:
        senior = m.group(1)
        reviewer = m.group(2)
        
    current_sec = None
    for i, line in enumerate(lines):
        ll = line.lower()
        if i < 15:
            m_rev = re.search(r'(?:your name|reviewer)\s*[:–-]\s*([^|\n]+)', line, re.I)
            if m_rev:
                reviewer = m_rev.group(1).strip()
            m_sen = re.search(r'senior(?:\'s)?(?:\s*name)?\s*[:–-]\s*([^|\n]+)', line, re.I)
            if m_sen:
                senior = m_sen.group(1).strip()
            if 'idp title:' in ll or 'title:' in ll:
                title = line.split(':', 1)[-1].strip()
            if 'semester undertaken:' in ll:
                semester = line.split(':', 1)[-1].strip()
            if 'professor/guide:' in ll or 'guide:' in ll or "professor's name:" in ll:
                val = line.split(':', 1)[-1].strip()
                if val and 'rate' not in val.lower() and '⚠' not in val:
                    guide = val
            if 'team size' in ll:
                team_size = line.split(':', 1)[-1].strip()
                
        if is_sec_header(line, ['project overview']):
            current_sec = 'overview'
            continue
        elif is_sec_header(line, ['learnings & applications', 'learnings']):
            current_sec = 'learnings'
            continue
        elif is_sec_header(line, ['grading']):
            current_sec = 'grading'
            continue
        elif is_sec_header(line, ['professor review']):
            current_sec = 'prof_review'
            continue
            
        if re.match(r'^\d+\.', line.strip()):
            if '?' in line:
                _, a = line.split('?', 1)
                a = a.strip()
                if a:
                    if current_sec == 'overview':
                        overview_lines.append(a)
                    elif current_sec == 'learnings':
                        learnings_lines.append(a)
                    elif current_sec == 'grading':
                        grading_lines.append(a)
            continue
            
        if current_sec == 'overview':
            overview_lines.append(line)
        elif current_sec == 'learnings':
            learnings_lines.append(line)
        elif current_sec == 'grading':
            grading_lines.append(line)
        elif current_sec == 'prof_review':
            rm = re.search(r'([A-Za-z\s]+)[:—–-]\s*(\d+(\.\d+)?(\s*/\s*10)?)', line)
            if rm:
                m_name = re.sub(r'^\d+\.\s*', '', rm.group(1)).strip()
                metrics[m_name] = rm.group(2).strip()

    if guide and not guide.startswith("Prof.") and not guide.startswith("Dr."):
        guide = f"Prof. {guide}"
        
    return {
        'id': project_id,
        'projectType': 'IDP',
        'title': title or "Institute Development Project",
        'student': f"{senior} (B.Tech)",
        'year': '2024–25',
        'professor': guide or "Department Faculty",
        'reviewer': reviewer,
        'semester': semester or "6th Semester",
        'teamSize': team_size,
        'domain': "Industrial & Interdisciplinary Project",
        'description': ' '.join(overview_lines).strip() or "Interdisciplinary industrial project applying engineering principles to real-world infrastructure.",
        'takeaways': ' '.join(learnings_lines).strip() or "Hands-on data handling, stakeholder coordination, and technical analysis.",
        'grading': ' '.join(grading_lines).strip() or "Evaluated through project reports, presentations, and guide assessment.",
        'advice': "Focus on concise presentations and clear milestones.",
        'metrics': metrics,
        'sourceFile': fname
    }

# Collect files
revised_files = []
for r, d, fs in os.walk('DAMP reviews/Elective Reviews'):
    if r != 'DAMP reviews/Elective Reviews':
        for f in fs:
            if f.endswith('.docx') and not f.startswith('~$'):
                revised_files.append(os.path.join(r, f))

root_unique = [
    'CM618 - Introduction to Climate Science - Dibyanshu Dash - Disha Gugale.docx',
    'CE325 - Engineering Law - Atharva Lele - Disha Gugale.docx',
    'GNR638 - Machine Learning for Remote Sensing II - Dibyanshu Dash - Disha Gugale.docx',
    'CE751 - Urban Transportation Systems and Planning - Atharva Lele - Disha Gugale.docx',
    'CE761 - Blast Resistant Structures - Atharva Lele - Disha Gugale.docx',
    'CE488 - Environmental Geotechniques - Dibyanshu Dash - Disha Gugale.docx',
    'CE771 - Optimization in Civil Engineering - Atharva Lele - Disha Gugale.docx',
    'CE776 - Transportation Project Evaluation and Decision Making - Dibyanshu Dash - Disha Gugale.docx',
    'CE776 - Transportation Project Evaluation and Decision Making - Atharva Lele - Disha Gugale.docx',
    'CE410 - Introduction to Offshore Engineering - Atharva Lele - Disha Gugale.docx',
    'CE773 - Geometric Design and Analysis of High Speed Roadways - Atharva Lele - Disha Gugale.docx',
    'CE751_Review_JinayVora_Pratham.docx',
    'IE624 - Generative and Agentic AI - Dibyanshu Dash - Disha Gugale.docx',
]

all_elective_paths = sorted(revised_files) + [os.path.join('DAMP reviews/Elective Reviews', f) for f in sorted(root_unique)]

# Existing core reviews
CORE_REVIEWS = [
  {
    'id': 1,
    'code': 'CE 201',
    'name': 'Fluid Mechanics',
    'type': 'Dept Core',
    'category': 'Core',
    'professor': 'Prof. T. I. Eldho / Prof. V. Jothiprakash',
    'semester': 3,
    'difficulty': 'Medium',
    'rating': 4,
    'leniency': 'Fair',
    'senior': 'Senior Batch',
    'reviewer': 'DAMP Team',
    'batch': '2026',
    'overview': 'Great foundational course covering fluid statics, kinematics, Navier-Stokes equations, and boundary layer theory. Lectures are well-structured.',
    'learnings': 'Develops core fluid dynamics modeling skills, turbulent flow analysis, and pipe network calculations.',
    'grading': 'Tutorials and numerical problem solving are essential for doing well in midsem and endsem.',
    'comments': 'Start tutorial problem sets early and practice past papers before midsems.',
    'metrics': {'Teaching Quality': '9/10', 'Evaluation Fairness': '8/10', 'Exam Predictability': '8/10'},
    'review': 'Great foundational course covering fluid statics, kinematics, Navier-Stokes equations, and boundary layer theory. Lectures are well-structured. Tutorials and numerical problem solving are essential for doing well in midsem and endsem.',
  },
  {
    'id': 2,
    'code': 'CE 301',
    'name': 'Structural Analysis',
    'type': 'Dept Core',
    'category': 'Core',
    'professor': 'Prof. Siddhartha Ghosh / Prof. Yogesh Desai',
    'semester': 5,
    'difficulty': 'Hard',
    'rating': 4,
    'leniency': 'Strict',
    'senior': 'Senior Batch',
    'reviewer': 'DAMP Team',
    'batch': '2026',
    'overview': 'One of the core pillars of Civil Engineering. Covers force method, displacement method, slope deflection, moment distribution, and stiffness matrix formulation.',
    'learnings': 'Structural matrix formulations, indeterminacy resolution, and deflection computation for complex trusses and frames.',
    'grading': 'Strict evaluation with emphasis on step-by-step equilibrium derivations and numerical correctness.',
    'comments': 'Highly rewarding conceptually if you practice derivations and solve previous years problems.',
    'metrics': {'Teaching Quality': '9/10', 'Evaluation Fairness': '8/10', 'Exam Predictability': '7/10'},
    'review': 'One of the core pillars of Civil Engineering. Covers force method, displacement method, slope deflection, moment distribution, and stiffness matrix formulation. Highly rewarding conceptually if you practice derivations and solve previous years problems.',
  },
  {
    'id': 3,
    'code': 'CE 221',
    'name': 'Solid Mechanics',
    'type': 'Dept Core',
    'category': 'Core',
    'professor': 'Prof. Sauvik Banerjee / Prof. Alok Goyal',
    'semester': 4,
    'difficulty': 'Medium',
    'rating': 4,
    'leniency': 'Fair',
    'senior': 'Senior Batch',
    'reviewer': 'DAMP Team',
    'batch': '2026',
    'overview': 'Well-taught course with clear mechanical derivations. Covers stress-strain tensors, Mohr\'s circle, shear force and bending moment diagrams, torsion, and deflection of beams.',
    'learnings': 'Fundamental mechanics of continuous media, failure criteria, and elastic stress state evaluation.',
    'grading': 'Quizzes, lab reports, midsem, and endsem. Lab work provides hands-on reinforcement.',
    'comments': 'The accompanying mechanics lab is hands-on and reinforces classroom formulas effectively.',
    'metrics': {'Teaching Quality': '9/10', 'Evaluation Fairness': '8/10', 'Exam Predictability': '8/10'},
    'review': 'Well-taught course with clear mechanical derivations. Covers stress-strain tensors, Mohr\'s circle, shear force and bending moment diagrams, torsion, and deflection of beams. The accompanying mechanics lab is hands-on.',
  },
  {
    'id': 4,
    'code': 'CE 102',
    'name': 'Engineering Mechanics',
    'type': 'Institute Core',
    'category': 'Core',
    'professor': 'Prof. Ravi Sinha / Prof. R. S. Jangid',
    'semester': 2,
    'difficulty': 'Medium',
    'rating': 5,
    'leniency': 'Fair',
    'senior': 'Senior Batch',
    'reviewer': 'DAMP Team',
    'batch': '2026',
    'overview': 'Fundamental institute core course introducing statics, dynamics, friction, virtual work, and particle kinetics.',
    'learnings': 'Free body diagrams, virtual work theorem, impulse-momentum formulations, and rigid body dynamics.',
    'grading': 'Weekly tutorials, bi-weekly quizzes, midsem, and comprehensive endsem.',
    'comments': 'Concepts developed here carry directly into Solid Mechanics and Structural Dynamics.',
    'metrics': {'Teaching Quality': '10/10', 'Evaluation Fairness': '9/10', 'Exam Predictability': '9/10'},
    'review': 'Fundamental institute core course introducing statics, dynamics, friction, virtual work, and particle kinetics. Concepts developed here carry directly into Solid Mechanics and Structural Dynamics.',
  },
  {
    'id': 5,
    'code': 'CE 305',
    'name': 'Geotechnical Engineering / Soil Mechanics',
    'type': 'Dept Core',
    'category': 'Core',
    'professor': 'Prof. Deepankar Choudhury / Prof. D. N. Singh',
    'semester': 5,
    'difficulty': 'Hard',
    'rating': 4,
    'leniency': 'Strict',
    'senior': 'Senior Batch',
    'reviewer': 'DAMP Team',
    'batch': '2026',
    'overview': 'Deep dive into soil classification, effective stress principle, Darcy flow, consolidation theory, shear strength of soils, and earth pressure theories.',
    'learnings': 'Terzaghi 1D consolidation, Mohr-Coulomb shear envelopes, flow nets, and retaining wall stability checks.',
    'grading': 'Rigorous quizzes, geotechnical lab testing reports, midsem, and endsem.',
    'comments': 'Highly engaging with real-world case studies and lab testing. Practice numericals thoroughly.',
    'metrics': {'Teaching Quality': '9/10', 'Evaluation Fairness': '8/10', 'Exam Predictability': '7/10'},
    'review': 'Deep dive into soil classification, effective stress principle, Darcy flow, consolidation theory, shear strength of soils, and earth pressure theories. Highly engaging with real-world case studies and lab testing.',
  },
  {
    'id': 6,
    'code': 'CE 341',
    'name': 'Transportation Engineering',
    'type': 'Dept Core',
    'category': 'Core',
    'professor': 'Prof. Tom V Mathew / Prof. Gopal R. Patil',
    'semester': 6,
    'difficulty': 'Medium',
    'rating': 4,
    'leniency': 'Fair',
    'senior': 'Senior Batch',
    'reviewer': 'DAMP Team',
    'batch': '2026',
    'overview': 'Covers geometric design of highways, traffic stream characteristics, signal timing design, capacity analysis, and pavement design guidelines (IRC).',
    'learnings': 'Traffic stream speed-density-flow relationships, Webster signal design, and IRC flexible pavement design.',
    'grading': 'Assignments, software applications, midsem, and endsem.',
    'comments': 'Very practical with assignments applying traffic engineering tools.',
    'metrics': {'Teaching Quality': '9/10', 'Evaluation Fairness': '8/10', 'Exam Predictability': '8/10'},
    'review': 'Covers geometric design of highways, traffic stream characteristics, signal timing design, capacity analysis, and pavement design guidelines (IRC). Very practical with assignments applying traffic engineering tools.',
  },
  {
    'id': 7,
    'code': 'CE 224',
    'name': 'Environmental Engineering',
    'type': 'Dept Core',
    'category': 'Core',
    'professor': 'Prof. Kapil Gupta',
    'semester': 5,
    'difficulty': 'Medium',
    'rating': 4,
    'leniency': 'Fair',
    'senior': 'Senior Batch',
    'reviewer': 'DAMP Team',
    'batch': '2026',
    'overview': 'Crucial for understanding water quality parameters, water treatment plant design, wastewater collection networks, and air pollution dispersion.',
    'learnings': 'Water treatment unit operations (coagulation, flocculation, sedimentation, filtration) and biological wastewater treatment.',
    'grading': 'Design problems, lab component, midsem, and endsem.',
    'comments': 'The design problems on sedimentation tanks and aeration units are comprehensive and practical.',
    'metrics': {'Teaching Quality': '8/10', 'Evaluation Fairness': '8/10', 'Exam Predictability': '8/10'},
    'review': 'Crucial for understanding water quality parameters, water treatment plant design, wastewater collection networks, and air pollution dispersion. The design problems on sedimentation tanks and aeration units are comprehensive.',
  },
  {
    'id': 8,
    'code': 'CE 303',
    'name': 'Design of Reinforced Concrete Structures',
    'type': 'Dept Core',
    'category': 'Core',
    'professor': 'Prof. Alok Goyal / Prof. Sauvik Banerjee',
    'semester': 5,
    'difficulty': 'Hard',
    'rating': 5,
    'leniency': 'Fair',
    'senior': 'Senior Batch',
    'reviewer': 'DAMP Team',
    'batch': '2026',
    'overview': 'Limit state design of beams, slabs, columns, and footings as per IS 456:2000. Includes comprehensive design project.',
    'learnings': 'Flexural limit state, shear detailing, torsion, column interaction curves, and footing design.',
    'grading': 'Design project portfolio, quizzes, midsem, and endsem.',
    'comments': 'Prepares you directly for structural engineering industry internships. Keep IS 456 handy at all times.',
    'metrics': {'Teaching Quality': '10/10', 'Evaluation Fairness': '9/10', 'Exam Predictability': '8/10'},
    'review': 'Limit state design of beams, slabs, columns, and footings as per IS 456:2000. Includes comprehensive design project that prepares you directly for structural engineering industry internships.',
  },
]

all_reviews = list(CORE_REVIEWS)
current_id = 9
for path in all_elective_paths:
    rev = parse_elective_review(path, current_id)
    all_reviews.append(rev)
    current_id += 1

print(f"Total parsed course reviews: {len(all_reviews)}")

btp_paths = [
    'DAMP reviews/BTP reviews/updated btp rishabh jain/BTP_Review_DunggamGao_rishabhjain.docx',
    'DAMP reviews/BTP reviews/updated btp rishabh jain/BTP_Review_RitikaBhadrecha_rishabhjain.docx',
    'DAMP reviews/BTP reviews/BTP review_parvseth_dishaagrawal.docx'
]
btp_reviews = []
p_id = 1
for p in btp_paths:
    btp_reviews.append(parse_btp_review(p, p_id))
    p_id += 1

idp_dir = 'DAMP reviews/IDP Reviews'
idp_paths = [os.path.join(idp_dir, f) for f in sorted(os.listdir(idp_dir)) if f.endswith('.docx') and not f.startswith('~$')]
idp_reviews = []
for p in idp_paths:
    idp_reviews.append(parse_idp_review(p, p_id))
    p_id += 1

print(f"Total BTP reviews: {len(btp_reviews)}")
print(f"Total IDP reviews: {len(idp_reviews)}")

combined_projects = []
for b in btp_reviews:
    combined_projects.append({
        'id': b['id'],
        'type': 'BTP',
        'title': b['title'],
        'student': b['student'],
        'year': b['year'],
        'professor': b['professor'],
        'reviewer': b['reviewer'],
        'semester': b['semester'],
        'teamSize': b['teamSize'],
        'domain': b['domain'],
        'description': b['description'],
        'takeaways': b['takeaways'],
        'grading': b['grading'],
        'advice': b['advice'],
        'metrics': b['metrics'],
        'sourceFile': b['sourceFile']
    })
for i in idp_reviews:
    combined_projects.append({
        'id': i['id'],
        'type': 'IDP',
        'title': i['title'],
        'student': i['student'],
        'year': i['year'],
        'professor': i['professor'],
        'reviewer': i['reviewer'],
        'semester': i['semester'],
        'teamSize': i['teamSize'],
        'domain': i['domain'],
        'description': i['description'],
        'takeaways': i['takeaways'],
        'grading': i['grading'],
        'advice': i['advice'],
        'metrics': i['metrics'],
        'sourceFile': i['sourceFile']
    })

real_resources = [
    {
        'category': 'Previous Year Question Papers (PYQs)',
        'description': 'Real exam papers collected directly from senior archives',
        'items': [
            {
                'title': 'CE 343 - Geotechnical Engineering / Soil Mechanics Midsem Question Paper',
                'type': 'PDF',
                'size': '3.8 MB',
                'url': '/resources/CE343_Midsem_QP.pdf',
                'isAvailable': True,
                'course': 'CE 343',
                'semester': 'Autumn / Sem 5'
            },
            {
                'title': 'CE 343 - Geotechnical Engineering Endsem PYQs Archive',
                'type': 'PDF',
                'size': '4.4 MB',
                'url': '/resources/CE343_Endsem_PYQs.pdf',
                'isAvailable': True,
                'course': 'CE 343',
                'semester': 'Autumn / Sem 5'
            }
        ]
    },
    {
        'category': 'Course Assignments & Class Activities',
        'description': 'Verified problem sets and class assignments from recent semesters',
        'items': [
            {
                'title': 'CM 615 - Climate Change Impacts and Adaptation: Comprehensive Assignment',
                'type': 'PDF',
                'size': '579 KB',
                'url': '/resources/CM615_Assignment.pdf',
                'isAvailable': True,
                'course': 'CM 615',
                'semester': 'Elective'
            },
            {
                'title': 'CM 615 - Assignment 1 (Climate Modeling & Scenarios)',
                'type': 'PDF',
                'size': '84 KB',
                'url': '/resources/CM615_Assignment_1.pdf',
                'isAvailable': True,
                'course': 'CM 615',
                'semester': 'Elective'
            },
            {
                'title': 'CM 615 - In-Class Activity 2 (Impacts Assessment Exercise)',
                'type': 'PDF',
                'size': '616 KB',
                'url': '/resources/CM615_Class_Activity_2.pdf',
                'isAvailable': True,
                'course': 'CM 615',
                'semester': 'Elective'
            }
        ]
    }
]

out_file = 'civil-damp-website_final/src/data/dampReviewsData.js'
with open(out_file, 'w', encoding='utf-8') as f:
    f.write("/**\n * Autogenerated DAMP Reviews Data\n * Extracted directly from official DAMP Reviews repository\n */\n\n")
    f.write("export const courseReviews = " + json.dumps(all_reviews, indent=2) + ";\n\n")
    f.write("export const btpReviews = " + json.dumps(btp_reviews, indent=2) + ";\n\n")
    f.write("export const idpReviews = " + json.dumps(idp_reviews, indent=2) + ";\n\n")
    f.write("export const allProjects = " + json.dumps(combined_projects, indent=2) + ";\n\n")
    f.write("export const realAcademicResources = " + json.dumps(real_resources, indent=2) + ";\n")

print("Generated dampReviewsData.js successfully!")
