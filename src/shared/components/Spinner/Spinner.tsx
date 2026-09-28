import { Box, CircularProgress } from '@mui/material';

interface SpinnerProps {
  size?: number;
}

export function Spinner({ size = 40 }: SpinnerProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={200}
    >
      <CircularProgress size={size} />
    </Box>
  );
}
