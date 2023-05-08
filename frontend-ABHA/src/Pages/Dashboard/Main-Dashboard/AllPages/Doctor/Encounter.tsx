import React from 'react';

const EncounterTable = ({ encounters }) => {
    console.log(encounters)
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Subject</th>
          <th>Date</th>
          <th>Reason</th>
          <th>Extra Info</th>
          <th>Temperature</th>
          <th>Weight</th>
          <th>BP</th>
          <th>Glucose</th>
        </tr>
      </thead>
      <tbody>
        {encounters.map(encounter => (
          <tr key={encounter._id}>
            <td>{encounter.id}</td>
            <td>{encounter.status}</td>
            <td>{encounter.subject}</td>
            <td>{encounter.period}</td>
            <td>{encounter.reasonCode}</td>
            <td>{encounter.extrainfo}</td>
            <td>{encounter.patientTemperature}</td>
            <td>{encounter.patientWeight}</td>
            <td>{encounter.patientBP}</td>
            <td>{encounter.patientGlucose}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EncounterTable;
