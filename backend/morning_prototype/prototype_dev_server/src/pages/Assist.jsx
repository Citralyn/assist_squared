import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import collegeList from "../data/college.js";
import collegeMap from "../data/collegeMapping.js";
import majorList from "../data/uci_majors.js";
import csCourses from '../data/webscraped/uci_cs_courses.json';
import econCourses from '../data/webscraped/uci_econ_courses.json';
import icsCourses from '../data/webscraped/uci_ics_courses.json';
import in4Courses from '../data/webscraped/uci_in4_courses.json';
import mathCourses from '../data/webscraped/uci_math_courses.json';
import mgmtCourses from '../data/webscraped/uci_mgmt_courses.json';
import statsCourses from '../data/webscraped/uci_stats_courses.json';

// Mocked goal descriptions JSONs (merge yours here)
const goalJsonFiles = [
csCourses,
  econCourses,
  icsCourses,
  in4Courses,
  mathCourses,
  mgmtCourses,
  statsCourses
];

const InputWithDropdown = ({ options, label, onSelect }) => {
  const [input, setInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setFilteredOptions(
      input
        ? options.filter(opt => opt.toLowerCase().includes(input.toLowerCase()))
        : options
    );
  }, [input]);

  return (
    <div>
      <label>{label}</label><br />
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onBlur={() => {
          if (options.includes(input)) onSelect(input);
          else onSelect(null);
        }}
        onFocus={() => setFilteredOptions(options)}
      />
      <ul style={{ border: '1px solid #ccc', listStyle: 'none', padding: 0, maxHeight: 100, overflowY: 'auto' }}>
        {filteredOptions.map(opt => (
          <li key={opt} onMouseDown={() => { setInput(opt); onSelect(opt); }}>
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Assist = () => {
  const navigate = useNavigate();

  const [collegeName, setCollegeName] = useState('');
  const [collegeId, setCollegeId] = useState(null);
  const [collegeMsg, setCollegeMsg] = useState('');

  const [majorName, setMajorName] = useState('');
  const [majorKey, setMajorKey] = useState(null);
  const [majorMsg, setMajorMsg] = useState('');

  const [reports, setReports] = useState([]);

  const [courseNumber, setCourseNumber] = useState('');
  const [prefix, setPrefix] = useState('');
  const [cards, setCards] = useState([]);

  const handleCollegeSelect = async (name) => {
    setCollegeName(name);
    if (!name || !collegeMap[name]) {
      setCollegeMsg("Please select a valid college");
      return;
    }
    setCollegeMsg(`You selected ${name}`);
    const id = collegeMap[name];
    setCollegeId(id);

    const res = await fetch(`http://localhost:3000/api/agreements?receivingInstitutionId=120&sendingInstitutionId=${id}&academicYearId=75&categoryCode=major`);
    const data = await res.json();
    setReports(data.reports || []);
  };

  const handleMajorSelect = async (major) => {
    setMajorName(major);
    if (!major || !reports.length) {
      setMajorMsg("Please select a valid major");
      return;
    }

    const match = reports.find(r => r.label === major);
    if (!match) {
      setMajorMsg("Please select a valid major");
      return;
    }

    setMajorMsg(`You selected ${major}`);
    setMajorKey(match.key);
  };

  const findArticulation = async () => {
    if (!majorKey || !courseNumber || !prefix) return;

    const res = await fetch(`http://localhost:3000/api/articulation/Agreements?key=${majorKey}`);
    const data = await res.json();
    const articulations = JSON.parse(data.result.articulations || "[]");

    console.log(res);
    console.log(data); 
    console.log(articulations); 

    for (let articulation of articulations) {
        let art = articulation.articulation; 
      const sending = art.sendingArticulation;
      if (!sending || sending.noArticulationReason !== null) continue;

      const sendingCourse = sending.items?.[0]?.items?.[0];
      if (
        sendingCourse?.courseNumber?.toLowerCase() === courseNumber.toLowerCase() &&
        sendingCourse?.prefix?.toLowerCase() === prefix.toLowerCase()
      ) {
        const uciCourse = art.course;
        const uciPrefix = uciCourse.prefix;
        const uciCourseNumber = uciCourse.courseNumber;
        const fullTitle = `${uciPrefix} ${uciCourseNumber}`;

        console.log("COURSE: ")
        console.log(fullTitle)

function normalizeTitle(str) {
  return str.toLowerCase().replace(/\s+/g, ''); // remove all spaces, tabs, newlines
}

const rawFullTitle = `${uciPrefix}${uciCourseNumber}`;
const normalizedFullTitle = normalizeTitle(rawFullTitle);

let description = "No description found";
for (let file of goalJsonFiles) {
  const match = file.find(obj => {
    const normalizedObjTitle = normalizeTitle(obj.title);
    return normalizedObjTitle.startsWith(normalizedFullTitle);
  });
  if (match) {
    description = match.description;
    break;
  }
}



        const newCard = {
          title: fullTitle,
          description
        };

        setCards(prev => [...prev, newCard]);
        return;
      }
    }

    alert("No valid articulation found for entered course");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Select College & Major</h1>
      <InputWithDropdown
        label="College"
        options={collegeList}
        onSelect={handleCollegeSelect}
      />
      <p>{collegeMsg}</p>

      <InputWithDropdown
        label="Major"
        options={majorList}
        onSelect={handleMajorSelect}
      />
      <p>{majorMsg}</p>

      <h2>Enter Course Info</h2>
      <input placeholder="Prefix" value={prefix} onChange={e => setPrefix(e.target.value)} />
      <input placeholder="Course Number" value={courseNumber} onChange={e => setCourseNumber(e.target.value)} />
      <button onClick={findArticulation}>Find UCI Equivalent</button>

      <h2>Course Cards</h2>
      <div>
        {cards.map((card, idx) => (
          <div key={idx} style={{ border: '1px solid black', padding: 10, margin: 10 }}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/')}>Confirm Choices</button>
    </div>
  );
};

export default Assist;
