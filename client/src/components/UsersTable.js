import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

export default function UsersTable({ users, setSubmitting }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">TimeZone</TableCell>
            <TableCell align="right">Zip Code</TableCell>
            <TableCell align="right">Lat</TableCell>
            <TableCell align="right">Lon</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.timezone}</TableCell>
              <TableCell align="right">{user.zipCode}</TableCell>
              <TableCell align="right">{user.lat}</TableCell>
              <TableCell align="right">{user.lon}</TableCell>
              <TableCell align="right">
                <EditModal user={user} setSubmitting={setSubmitting} />
                <DeleteModal user={user} setSubmitting={setSubmitting} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
