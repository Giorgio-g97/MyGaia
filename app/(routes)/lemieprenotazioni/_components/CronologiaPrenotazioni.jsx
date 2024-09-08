import React from "react";

// Import Table List ShadCN
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CronologiaPrenotazioni = ({ cronPrenot }) => {
  return (
    <>
      <Table>
        <TableCaption>Lista prenotazioni</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Operatore</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Ora</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cronPrenot &&
            cronPrenot.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.operatori.nomeOperatore}</TableCell>
                <TableCell>{item.data}</TableCell>
                <TableCell>{item.ora}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CronologiaPrenotazioni;
