import pandas as pd
import gdown
import json
import os
import re

file_path = r"D:\Downloads\MeetTheTeam Post .xlsx"
df = pd.read_excel(file_path)

records = df.to_dict('records')

# Mapping from user prompt, corrected
hierarchy = {
    "Web": {
        "head": "Parv Seth",
        "members": ["Kunal Gandvane", "Naitik Agarwal", "Atharva Lele", "Rishabh Agarwal", "Mrunal Pachpande"]
    },
    "Blog & Media": {
        "head": "Nehul Gupta",
        "members": ["Arinjay Nigam", "Maanya Agrawal", "Manikarnika Sharma", "Mrunal Pachpande", "Neel Wadhwa", "Ritesh Srivastava", "Shashwat Jain", "Yashika Singh"]
    },
    "Events": {
        "head": "Aryan Kashyap",
        "members": ["Anviksha Vipassana", "Arit Misra", "Ishaan Singh Pawar", "Meghav Singhal", "Sarthak Kastiya", "Shashwat Jain", "Vedant Patel"]
    },
    "Core & Research": {
        "head": "Puranjay Bansal",
        "members": ["Akshara Gupta", "Anushka Bansode", "Archit Kumbhre", "Naga Ganesh", "Neeraj Wankhede", "Sanvi Gupta"]
    },
    "Resources": {
        "head": "Prateek Jadhao",
        "members": ["Disha Agrawal", "Disha Gugale", "Pratham Bagdi", "Raj Achliya", "Rishabh Jain", "Vansh Chandarana"]
    }
}

# Ensure directory exists
photo_dir = r"C:\Users\acer\.gemini\antigravity\scratch\civil-damp-website\civil-damp-website-master\public\team-photos"
os.makedirs(photo_dir, exist_ok=True)

# Clean name
def clean_name(name):
    return str(name).strip().replace('\u00a0', ' ')

mentors = []
subgroupHeads = []
mentor_id = 1
head_id = 1

def find_record(name):
    best_match = None
    for r in records:
        r_name = clean_name(r.get("Name ", ""))
        if not r_name: continue
        # exact match
        if r_name.lower() == name.lower():
            return r
        # partial match
        if name.lower() in r_name.lower():
            best_match = r
    return best_match

for subgroup, data in hierarchy.items():
    head_name = data["head"]
    members = data["members"]
    
    # Process head
    r = find_record(head_name)
    if r:
        real_name = clean_name(r["Name "])
        intro = str(r["Write a brief introduction about yourself (up to 60 words). Feel free to showcase your personality, interests, achievements, or a fun fact - this will be featured on the website"])
        ldap = str(r["LDAP ID"])
        link = str(r["Please upload an image of yourself (to go on both the Insta Post & Website) "])
        
        # Format photo name
        photo_filename = re.sub(r'[^a-zA-Z0-9]', '_', real_name.lower()) + ".jpg"
        photo_path = os.path.join(photo_dir, photo_filename)
        
        # Download photo if missing
        if "id=" in link and not os.path.exists(photo_path):
            file_id = link.split("id=")[1].split("&")[0]
            try:
                gdown.download(id=file_id, output=photo_path, quiet=True)
            except Exception as e:
                print(f"Failed to download for {real_name}: {e}")
        
        subgroupHeads.append({
            "id": head_id,
            "name": real_name,
            "subgroup": subgroup,
            "year": "3rd/4th Year",
            "email": ldap,
            "linkedin": "#",
            "description": intro.replace("\n", " ").replace('"', '\\"'),
            "photo": f"/team-photos/{photo_filename}"
        })
        head_id += 1
    else:
        # User is not in excel
        subgroupHeads.append({
            "id": head_id,
            "name": head_name,
            "subgroup": subgroup,
            "year": "3rd/4th Year",
            "email": "comingsoon@iitb.ac.in",
            "linkedin": "#",
            "description": "Details coming soon...",
            "photo": ""
        })
        head_id += 1
        
    # Process members
    for m_name in members:
        if not m_name.strip(): continue
        r = find_record(m_name)
        if r:
            real_name = clean_name(r["Name "])
            intro = str(r["Write a brief introduction about yourself (up to 60 words). Feel free to showcase your personality, interests, achievements, or a fun fact - this will be featured on the website"])
            ldap = str(r["LDAP ID"])
            link = str(r["Please upload an image of yourself (to go on both the Insta Post & Website) "])
            
            photo_filename = re.sub(r'[^a-zA-Z0-9]', '_', real_name.lower()) + ".jpg"
            photo_path = os.path.join(photo_dir, photo_filename)
            
            if "id=" in link and not os.path.exists(photo_path):
                file_id = link.split("id=")[1].split("&")[0]
                try:
                    gdown.download(id=file_id, output=photo_path, quiet=True)
                except Exception as e:
                    print(f"Failed to download for {real_name}: {e}")
                    
            mentors.append({
                "id": mentor_id,
                "name": real_name,
                "year": "2nd/3rd Year",
                "subgroup": subgroup,
                "email": ldap,
                "intro": intro.replace("\n", " ").replace('"', '\\"'),
                "photo": f"/team-photos/{photo_filename}"
            })
            mentor_id += 1
        else:
            print(f"Could not find record for member: {m_name}")
            mentors.append({
                "id": mentor_id,
                "name": m_name,
                "year": "2nd/3rd Year",
                "subgroup": subgroup,
                "email": "comingsoon@iitb.ac.in",
                "intro": "Details coming soon...",
                "photo": ""
            })
            mentor_id += 1

output = "export const subgroupHeads = [\n"
for h in subgroupHeads:
    output += f"  {{ id: {h['id']}, name: \"{h['name']}\", subgroup: \"{h['subgroup']}\", year: \"{h['year']}\", email: \"{h['email']}\", linkedin: \"{h['linkedin']}\", description: \"{h['description']}\", photo: \"{h['photo']}\" }},\n"
output += "];\n\n"

output += "export const mentors = [\n"
for m in mentors:
    output += f"  {{ id: {m['id']}, name: \"{m['name']}\", year: \"{m['year']}\", subgroup: \"{m['subgroup']}\", email: \"{m['email']}\", intro: \"{m['intro']}\", photo: \"{m['photo']}\" }},\n"
output += "];\n"

with open("team_data_output.js", "w", encoding="utf-8") as f:
    f.write(output)

print("Done generating team_data_output.js")
