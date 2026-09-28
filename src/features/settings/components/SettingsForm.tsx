import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Box, CircularProgress } from '@mui/material';
import { Settings } from '../types';

interface SettingsFormProps {
  initialSettings: Settings;
  onSave: (data: Partial<Settings>) => void;
}

const validationSchema = Yup.object({
  companyName: Yup.string().required('Company name is required'),
  supportEmail: Yup.string().required('Support email is required').email('Invalid email format'),
  maxTicketsPerEvent: Yup.number()
    .required('Max tickets is required')
    .min(1, 'Must be at least 1')
    .integer(),
});

export function SettingsForm({ initialSettings, onSave }: SettingsFormProps) {
  const formik = useFormik({
    initialValues: {
      companyName: initialSettings?.companyName ?? '',
      supportEmail: initialSettings?.supportEmail ?? '',
      maxTicketsPerEvent: initialSettings?.maxTicketsPerEvent ?? undefined,
    },
    validationSchema,
    onSubmit: (values) => {
      const partial: Partial<Settings> = {};
      if (values.companyName) partial.companyName = values.companyName;
      if (values.supportEmail) partial.supportEmail = values.supportEmail;
      if (values.maxTicketsPerEvent) partial.maxTicketsPerEvent = values.maxTicketsPerEvent;
      onSave(partial);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Company Name"
          name="companyName"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.companyName && formik.touched.companyName)}
          helperText={formik.errors.companyName}
          disabled={formik.isSubmitting}
          margin="dense"
          variant="outlined"
          size="small"
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Support Email"
          name="supportEmail"
          type="email"
          value={formik.values.supportEmail}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.supportEmail && formik.touched.supportEmail)}
          helperText={formik.errors.supportEmail}
          disabled={formik.isSubmitting}
          margin="dense"
          variant="outlined"
          size="small"
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Max Tickets Per Event"
          name="maxTicketsPerEvent"
          type="number"
          inputProps={{ min: 1 }}
          value={formik.values.maxTicketsPerEvent}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.maxTicketsPerEvent && formik.touched.maxTicketsPerEvent)}
          helperText={formik.errors.maxTicketsPerEvent}
          disabled={formik.isSubmitting}
          margin="dense"
          variant="outlined"
          size="small"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
          sx={{ minWidth: 120 }}
        >
          {formik.isSubmitting ? <CircularProgress size={20} /> : 'Save'}
        </Button>
      </Box>
    </Box>
  );
}
