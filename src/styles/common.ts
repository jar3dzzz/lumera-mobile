import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const formStyles = StyleSheet.create({
  container: {
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontFamily: theme.fontFamily.regular,
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    fontFamily: theme.fontFamily.regular,
  },
  errorText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.error,
    fontFamily: theme.fontFamily.regular,
  },
  inputText:{
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.regular,
  },
  submitButton:{
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText:{
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.bold,
  },
  cancelButton:{
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText:{
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.bold,
  }
});
