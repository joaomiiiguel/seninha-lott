import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export const AlertModal = ({ message, status }) => {
    return (
        <Stack className='shadow' spacing={2}>
            <Alert className="flex items-center justify-center" severity={status}>{message}</Alert>
        </Stack>
    )
}