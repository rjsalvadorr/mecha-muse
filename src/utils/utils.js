function getFretSpan(markerData) {
  let highest = 1;
  for (var i = 0; i < markerData.length; i++) {
    let marker = markerData[i].split(",");
    if (marker[2] > highest) {
      highest = marker[2];
    }
  }
  return highest;
}

function getStringSpan(markerData) {
  let lowest = 999;
  let highest = 0;
  for (var i = 0; i < markerData.length; i++) {
    let marker = markerData[i].split(",");
    if (marker[1] < lowest) {
      lowest = marker[1];
    }
    if (marker[1] > highest) {
      highest = marker[1];
    }
  }
  return highest - lowest + 1;
}

function getStringsUsed(markerData) {
  const stringsUsed = [];
  for (var i = 0; i < markerData.length; i++) {
    let marker = markerData[i].split(",");
    stringsUsed.push(marker[1]);
  }
  return stringsUsed;
}

function getTopNote(markerData) {
  let topMarker = markerData[0].split(",");
  return topMarker[0];
}

function getBottomNote(markerData) {
  let topMarker = markerData[markerData.length - 1].split(",");
  return topMarker[0];
}

export function buildDiagram(inputDiagram, id) {
  return {
    chordQuality: inputDiagram.chordQuality,
    inversion: inputDiagram.inversion,
    markers: inputDiagram.markers,
    id: id,
    fretSpan: getFretSpan(inputDiagram.markers),
    stringSpan: getStringSpan(inputDiagram.markers),
    stringsUsed: getStringsUsed(inputDiagram.markers),
    topNote: getTopNote(inputDiagram.markers),
    bottomNote: getBottomNote(inputDiagram.markers)
  };
}

function checkDiagram(diagram, options) {
  let blocked = false;
  const chordTypes = options.chordTypes.split(",");
  if (
    diagram.fretSpan < options.fretSpanMin ||
    diagram.fretSpan > options.fretSpanMax ||
    !chordTypes.includes(diagram.chordQuality) ||
    diagram.stringSpan < options.stringSpanMin ||
    diagram.stringSpan > options.stringSpanMax
  ) {
    blocked = true;
  }
  return !blocked;
}

export function filterDiagrams(inputDiagrams, options) {
  const outputDiagrams = [];
  for (var i = 0; i < inputDiagrams.length; i++) {
    let diagram = inputDiagrams[i];
    if (checkDiagram(diagram, options)) {
      outputDiagrams.push(diagram);
    }
  }
  return outputDiagrams;
}
