// domain.com/aboutus/:id (id is dynamic)

import { useRouter } from "next/router";

const developers = [
  { id: "1", name: "Yash", role: "Senior Developer" },
  { id: "2", name: "Vaibhav", role: "Backend Developer" },
  { id: "3", name: "Suresh", role: "Frontend Developer" },
];

const developer = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  const developer = developers.find((dev) => dev.id === id);

  if (!developer) {
    return <div>Developer doesn't exist</div>;
  }

  return (
    <div>
      <h1>{developer.name}</h1>
      <p>{developer.role}</p>
    </div>
  );
};

export default developer;
