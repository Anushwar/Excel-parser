import { useState } from "react";
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import XLSX from "xlsx";

const Upload = () => {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
      console.log(d);
    });
  };
  return (
    <div>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <Table variant="striped">
        <TableCaption>Parsing and displaying the Excel sheet</TableCaption>
        <Thead>
          <Tr>
            <Th>Mobile</Th>
            <Th>Id</Th>
            <Th>Earning</Th>
            <Th> Action </Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((d) => (
            <Tr key={d.mobile}>
              <Td>{d.mobile}</Td>
              <Td>{d.earning_id}</Td>
              <Td>{d.earning}</Td>
              <Td>Approve| Reject</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Upload;
