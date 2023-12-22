// domain.com/aboutus

import Link from "next/link";

const developers = [
  { id: "1", name: "Yash", role: "Senior Developer" },
  { id: "2", name: "Vaibhav", role: "Backend Developer" },
  { id: "3", name: "Suresh", role: "Frontend Developer" },
];

function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <ul>
        {developers.map((dev) => (
          <li key={dev.id}>
            <Link href={`./aboutus/${dev.id}`}>{dev.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AboutPage;
