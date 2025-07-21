"use client";
import { useState } from "react";
import { exportHTML } from "@/utils/exportHTML"; // Importing the export function

// Components Imported:
import FullWidthImage from "@/templates/FullWidthImage"; // Full Width Image Component
import FullWidthText from "@/templates/FullWidthText"; // Full Width Text Component


export default function Home() {
  const [selectedComponents, setSelectedComponents] = useState<any[]>([]);

  // Update addComponent to add component with props
  const addComponent = (component: string, props = {}) => {
    setSelectedComponents([...selectedComponents, { type: component, props }]);
  };

  // Update component props
  const updateComponent = (index: number, newProps: any) => {
    const updated = [...selectedComponents];
    updated[index] = { ...updated[index], props: { ...updated[index].props, ...newProps } };
    setSelectedComponents(updated);
    console.log(updated[index].props);

  }

  const handleExport = () => {
    exportHTML(selectedComponents); // Pass the array to be processed inside exportHTML.js
  };

  return (
    <div className="grid grid-cols-[250px_1fr_250px] min-h-screen gap-4 p-4">
      {/* Sidebar - Template Components */}
      <aside className="bg-gray-100 p-4 rounded-lg">
        <h2 className="font-semibold mb-4">Components</h2>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded mb-2"
          onClick={() => addComponent("FullWidthImage", { imageURL: "", backgroundColor: "black" })}

        >
          Full Width Image
        </button>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded mb-2"
          onClick={() => addComponent("FullWidthText", {
            backgroundColor: "white",
          })}
        >
          Full Width Text
        </button>
        {/* Add more buttons for other components */}
      </aside>

      {/* Main Workspace */}
      <main className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="font-semibold mb-4">Email Template</h2>
        <div className="border p-4 min-h-[400px] justify-items-center bg-gray-200">
          <div className="max-w-[600px]">
            {selectedComponents.length === 0 ? (
              <p className="text-gray-500">Add components to build your template.</p>
            ) : (
              selectedComponents.map((comp, index) => (
                <div key={index} className="mb-0">
                  {comp.type === "FullWidthImage" && (
                    <FullWidthImage
                      {...comp.props}
                      onUpdate={(newProps) => updateComponent(index, newProps)}
                    />
                  )}
                  {comp.type === "FullWidthText" && (
                    <FullWidthText
                      {...comp.props}
                      onUpdate={(newHeader, newBody) => updateComponent(index, { headerText: newHeader, bodyText: newBody })}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>


      {/* Right Panel - Reorder & Export */}
      <aside className="bg-gray-100 p-4 rounded-lg">
        <h2 className="font-semibold mb-4">Options</h2>
        <button className="w-full bg-green-500 text-white p-2 rounded" onClick={handleExport}>
          Export HTML
        </button>
      </aside>
    </div>
  );
}
