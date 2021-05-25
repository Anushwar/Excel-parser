import { useState } from "react";
import {
  Button,
  Checkbox,
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
  const [checkedIds, setCheckedIds] = useState([]);

  const handleApprove = () => {
    Object.values(checkedIds).forEach((id) => {
      if (items[id - 1] != null) {
        items[id - 1].status = "Approved";
        items[id - 1].remark = "";
      }
      console.log(items[id - 1]);
    });
    setCheckedIds([]);
    setItems(items);
  };

  const handleReject = () => {
    const remark = window.prompt("Enter your remark for rejecting: ");
    Object.values(checkedIds).forEach((id) => {
      if (items[id - 1] != null) {
        items[id - 1].status = "Rejected";
        items[id - 1].remark = remark;
      }
      console.log(items[id - 1]);
    });
    setCheckedIds([]);
    setItems(items);
  };

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
      <Button variant="link" colorScheme="blue" ms={1} onClick={handleApprove}>
        Approve
      </Button>
      <Button variant="link" colorScheme="blue" ms={1} onClick={handleReject}>
        Reject
      </Button>
      <Table variant="striped">
        <TableCaption>Parsing and displaying the Excel sheet</TableCaption>
        <Thead>
          <Tr>
            <Th> Action </Th>
            <Th>Mobile</Th>
            <Th>Id</Th>
            <Th>Earning</Th>
            <Th>Status</Th>
            <Th>Remark</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((d) => (
            <Tr key={d.earning_id}>
              <Td id={d.earning_id}>
                <Checkbox
                  isChecked={checkedIds.includes(d.earning_id)}
                  onChange={(event) => {
                    event.stopPropagation();
                    const index = checkedIds.indexOf(d.earning_id);

                    if (index > -1) {
                      setCheckedIds([
                        ...checkedIds.slice(0, index),
                        ...checkedIds.slice(index + 1),
                      ]);
                    } else {
                      setCheckedIds([...checkedIds, d.earning_id]);
                    }
                  }}
                />
              </Td>
              <Td>{d.mobile}</Td>
              <Td>{d.earning_id}</Td>
              <Td>{d.earning}</Td>
              <Td>{d.status}</Td>
              <Td>{d.remark}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Upload;
