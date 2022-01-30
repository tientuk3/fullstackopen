import React from 'react'

import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableBody,
  Typography
} from '@material-ui/core'

const UserList = ({ users }) => {

  if (users) {
    return (
      <div>
        <Typography variant="h4">Käyttäjät</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.username}>
                  <TableCell>
                    <b>{user.name}</b>
                  </TableCell>
                  <TableCell>
                    {user.blogs.length} blogia
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  } else {
    return null
  }


}

export default UserList