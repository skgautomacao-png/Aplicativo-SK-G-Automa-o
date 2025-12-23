import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Simple parser to detect markdown tables and render them properly
  // This is a lightweight alternative to full markdown libraries for this specific use case
  
  const sections = content.split(/(\n\|.*\|\n)/g);

  return (
    <div className="text-sm md:text-base leading-relaxed text-gray-800 space-y-4">
      {content.split('\n').map((line, index) => {
        // Detect table row
        if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
          // It's a table row. We need to collect consecutive table rows to form a table.
          // However, for simplicity in this stream-like rendering without a heavy parser:
          // We will check if the PREVIOUS or NEXT line is also a table row to group them?
          // A simpler React approach without a library is tricky. 
          
          // Let's use a robust strategy: Tokenize the whole content first.
          return null; 
        }
        return null;
      })}
      
      {/* Re-implementation using a split strategy for tables */}
      {renderContentWithTables(content)}
    </div>
  );
};

const renderContentWithTables = (text: string) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let tableRows: string[] = [];
  let inTable = false;

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    const isTableLine = trimmed.startsWith('|') && trimmed.endsWith('|');

    if (isTableLine) {
      if (!inTable) {
        inTable = true;
      }
      tableRows.push(trimmed);
    } else {
      if (inTable) {
        // Flush table
        elements.push(<TableBlock key={`table-${i}`} rows={tableRows} />);
        tableRows = [];
        inTable = false;
      }
      if (trimmed !== '') {
        // Basic formatting for bold text
        const parts = line.split(/(\*\*.*?\*\*)/g);
        elements.push(
          <p key={`p-${i}`} className="mb-2 min-h-[1em]">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      }
    }
  });

  // Flush remaining table if exists
  if (inTable && tableRows.length > 0) {
    elements.push(<TableBlock key="table-end" rows={tableRows} />);
  }

  return elements;
};

const TableBlock: React.FC<{ rows: string[] }> = ({ rows }) => {
  // Parse rows
  // Filter out separator lines like |---|---|
  const dataRows = rows.filter(r => !r.includes('---'));
  
  if (dataRows.length === 0) return null;

  const headers = dataRows[0].split('|').filter(c => c.trim() !== '').map(c => c.trim());
  const bodyRows = dataRows.slice(1).map(r => r.split('|').filter(c => c.trim() !== '').map(c => c.trim()));

  return (
    <div className="overflow-x-auto my-4 border border-gray-300 rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((h, idx) => (
              <th key={idx} scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200 last:border-r-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bodyRows.map((row, rIdx) => (
            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-6 py-4 whitespace-normal text-sm text-gray-700 border-r border-gray-200 last:border-r-0">
                   {/* Handle Bold inside cells */}
                   {cell.split(/(\*\*.*?\*\*)/g).map((part, k) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={k} className="text-black">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                   })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarkdownRenderer;