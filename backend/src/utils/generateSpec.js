export const generateSpec = (formData) => {
  const { goal, users, constraints, type, risks } = formData;

  // Generate user stories
  const userStories = [
    `As a ${users}, I want to ${goal} so that I can achieve my objectives`,
    `As a ${users}, I need the system to handle ${constraints}`,
    `As a ${users}, I want a smooth experience despite ${risks || 'potential challenges'}`
  ];

  // Generate tasks based on project type
  let tasks = [];
  let taskOrder = 1;

  if (type === 'Web') {
    tasks.push(
      { title: 'Setup authentication system', category: 'Backend', order: taskOrder++ },
      { title: 'Create REST API endpoints', category: 'Backend', order: taskOrder++ },
      { title: 'Design database schema', category: 'Database', order: taskOrder++ },
      { title: 'Build login/signup UI', category: 'Frontend', order: taskOrder++ },
      { title: 'Create dashboard component', category: 'Frontend', order: taskOrder++ },
      { title: 'Implement API integration', category: 'Frontend', order: taskOrder++ }
    );
  } else if (type === 'Mobile') {
    tasks.push(
      { title: 'Setup mobile authentication', category: 'Backend', order: taskOrder++ },
      { title: 'Create API endpoints', category: 'Backend', order: taskOrder++ },
      { title: 'Design database schema', category: 'Database', order: taskOrder++ },
      { title: 'Build responsive UI', category: 'Frontend', order: taskOrder++ },
      { title: 'Implement mobile auth flow', category: 'Frontend', order: taskOrder++ },
      { title: 'Setup API integration', category: 'Frontend', order: taskOrder++ }
    );
  } else if (type === 'Internal Tool') {
    tasks.push(
      { title: 'Setup basic authentication', category: 'Backend', order: taskOrder++ },
      { title: 'Create API endpoints', category: 'Backend', order: taskOrder++ },
      { title: 'Design database schema', category: 'Database', order: taskOrder++ },
      { title: 'Build user interface', category: 'Frontend', order: taskOrder++ },
      { title: 'Implement core features', category: 'Frontend', order: taskOrder++ }
    );
  }

  return {
    goal,
    users,
    constraints,
    type,
    risks,
    userStories,
    tasks
  };
};
