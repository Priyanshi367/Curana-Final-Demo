import { Node, Edge, Position } from 'reactflow';
import dagre from '@dagrejs/dagre';

type Direction = 'TB' | 'LR';

export const getLayoutedElements = (
  nodes: Node[], 
  edges: Edge[], 
  direction: Direction = 'TB',
  nodeWidth = 200,
  nodeHeight = 100
) => {
  // Create a new directed graph
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ 
    rankdir: direction,
    nodesep: 100,
    ranksep: 100,
    marginx: 20,
    marginy: 20,
  });

  // Set nodes
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { 
      width: nodeWidth, 
      height: nodeHeight,
    });
  });

  // Set edges
  edges.forEach((edge) => {
    if (edge.source && edge.target) {
      dagreGraph.setEdge(edge.source, edge.target);
    }
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Apply the calculated positions to the nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
    };
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
};
