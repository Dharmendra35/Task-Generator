export default function ExportButtons({ spec }) {
  const generateMarkdown = () => {
    let markdown = `# Project Plan\n\n`;
    markdown += `## Goal\n${spec.goal}\n\n`;
    markdown += `## Target Users\n${spec.users}\n\n`;
    markdown += `## Constraints\n${spec.constraints}\n\n`;
    markdown += `## Project Type\n${spec.type}\n\n`;
    if (spec.risks) markdown += `## Risks/Unknowns\n${spec.risks}\n\n`;
    
    markdown += `## User Stories\n`;
    spec.userStories.forEach(story => {
      markdown += `- ${story}\n`;
    });
    
    markdown += `\n## Tasks\n`;
    const categories = ['Frontend', 'Backend', 'Database'];
    categories.forEach(category => {
      const categoryTasks = spec.tasks.filter(t => t.category === category);
      if (categoryTasks.length > 0) {
        markdown += `\n### ${category}\n`;
        categoryTasks.forEach(task => {
          markdown += `- ${task.title}\n`;
        });
      }
    });
    
    return markdown;
  };

  const handleCopyToClipboard = () => {
    const markdown = generateMarkdown();
    navigator.clipboard.writeText(markdown);
    alert('Copied to clipboard!');
  };

  const handleDownloadMarkdown = () => {
    const markdown = generateMarkdown();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdown));
    element.setAttribute('download', 'project-plan.md');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleCopyToClipboard}
        className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
      >
        Copy to Clipboard
      </button>
      <button
        onClick={handleDownloadMarkdown}
        className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition"
      >
        Download as MD
      </button>
    </div>
  );
}
