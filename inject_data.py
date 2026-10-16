import os
import re

dummy_path = r"C:\Users\acer\.gemini\antigravity\scratch\civil-damp-website\civil-damp-website-master\src\data\dummy.js"
output_path = r"C:\Users\acer\.gemini\antigravity\scratch\civil-damp-website\civil-damp-website-master\team_data_output.js"

with open(dummy_path, "r", encoding="utf-8") as f:
    content = f.read()

with open(output_path, "r", encoding="utf-8") as f:
    new_data = f.read()

# The regex will match from 'export const subgroupHeads = [' until the end of 'export const mentors = [ ... ];'
# Because mentors comes right after subgroupHeads usually. Let's find them explicitly.

start_subgroup = content.find("export const subgroupHeads = [")
# find export const facultyCoordinator to know where mentors ends
end_mentors = content.find("export const facultyCoordinator = {")

if start_subgroup != -1 and end_mentors != -1:
    new_content = content[:start_subgroup] + new_data + "\n" + content[end_mentors:]
    with open(dummy_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Replaced successfully!")
else:
    print("Could not find replacement boundaries!")
