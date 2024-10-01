import { Card, CardContent, Grid } from "@mui/material";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./SalesPipeline.css"; // Import the CSS file

const initialStages = [
  { stage: "Cold", leads: ["Alice Johnson", "Mark Smith", "Jane Doe"] },
  { stage: "Warm", leads: ["John Brown", "Emily White"] },
  { stage: "Hot", leads: ["Chris Green", "Oliver Twist"] },
  { stage: "New", leads: ["Liam Neeson", "Emma Stone"] },
  { stage: "Assigned", leads: ["Mia Thermopolis", "John Wick"] },
  { stage: "In Progress", leads: ["Chris Pratt", "Scarlett Johansson"] },
  { stage: "Done", leads: ["Michael Blue", "Sarah Black"] },
  { stage: "Won", leads: ["Tony Stark"] },
  { stage: "Lost", leads: ["Bruce Wayne"] },
];

const SalesPipeline = () => {
  const [stages, setStages] = React.useState(initialStages);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceStageIndex = source.droppableId;
    const destStageIndex = destination.droppableId;

    const newStages = [...stages];

    // Moving leads between different stages
    if (sourceStageIndex !== destStageIndex) {
      const sourceLeads = Array.from(newStages[sourceStageIndex].leads);
      const [movedLead] = sourceLeads.splice(source.index, 1);
      const destLeads = Array.from(newStages[destStageIndex].leads);
      destLeads.splice(destination.index, 0, movedLead);

      newStages[sourceStageIndex].leads = sourceLeads;
      newStages[destStageIndex].leads = destLeads;
    } else {
      // Moving leads within the same stage
      const leads = Array.from(newStages[sourceStageIndex].leads);
      const [movedLead] = leads.splice(source.index, 1);
      leads.splice(destination.index, 0, movedLead);
      newStages[sourceStageIndex].leads = leads;
    }

    setStages(newStages);
  };

  // Dividing stages into grouped arrays
  const stageGroups = [
    stages.slice(0, 3), // Cold, Warm, Hot
    stages.slice(3, 7), // New, Assigned, In Progress, Done
    stages.slice(7, 9), // Won, Lost
  ];

  return (
    <div className="sales-pipeline-container">
      <h2>Sales Pipeline</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        {stageGroups.map((group, groupIndex) => (
          <Grid container spacing={2} key={groupIndex}>
            {group.map((stage, index) => (
              <Grid
                item
                xs={groupIndex === 1 ? 3 : 4} // Adjust width for the second row
                key={index}
              >
                <Droppable
                  droppableId={
                    groupIndex === 0 ? index.toString() : (3 + index).toString()
                  }
                >
                  {(provided) => (
                    <div
                      className="stage-container"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <h3 className="stage-title">{stage.stage}</h3>
                      {stage.leads.length > 0 ? (
                        stage.leads.map((lead, idx) => (
                          <Draggable key={lead} draggableId={lead} index={idx}>
                            {(provided) => (
                              <Card
                                className="lead-card"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <CardContent>{lead}</CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <Card className="empty-card">
                          <CardContent>No Leads</CardContent>
                        </Card>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Grid>
            ))}
          </Grid>
        ))}
      </DragDropContext>
    </div>
  );
};

export default SalesPipeline;
