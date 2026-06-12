import { StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';

export const loginFormStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: theme.fontFamily.bold,
    marginBottom: 6,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
    lineHeight: 20,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
    position: 'relative',
  },
  inputLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontFamily: theme.fontFamily.semiBold,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputWrapperError: {
    borderColor: "#a13d2d",
    borderWidth: 1.5,
  },
  inputIcon: {
    marginRight: 12,
  },
  inputText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    fontFamily: theme.fontFamily.regular,
    height: '100%',
  },
  helperText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontFamily: theme.fontFamily.regular,
    marginTop: 8,
    marginBottom: 20,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    fontFamily: theme.fontFamily.semiBold,
    marginTop: 8,
  },
  forgotPasswordLink: {
    color: "#e2c68a",
    fontSize: 14,
    fontFamily: theme.fontFamily.semiBold,
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#3c7330', 
    borderRadius: 12,
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#3c7330',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: theme.fontFamily.bold,
  },
  buttonArrow: {
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: theme.fontFamily.semiBold,
  },
  footerLinkText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontFamily: theme.fontFamily.regular,
    textAlign: 'center',
    marginTop: 24,
  },
  footerLinkBold: {
    color: '#ffffff',
    fontFamily: theme.fontFamily.bold,
  },
  passwordInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  eyeIconWrapper: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // OTP Verification view styles
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '100%',
  },
  otpBox: {
    width: 44,
    height: 54,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFocused: {
    borderColor: theme.colors.brightFern, // Bright green highlight (#7CB842)
  },
  otpBoxError: {
    borderColor: theme.colors.error,
    borderWidth: 1.5,
  },
  otpText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: theme.fontFamily.bold,
  },

  // Password strength meter styles
  strengthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 6,
    width: '100%',
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  strengthText: {
    fontSize: 12,
    fontFamily: theme.fontFamily.semiBold,
    marginBottom: 16,
  },

  // Support / Help view styles
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  supportCardSelected: {
    backgroundColor: 'rgba(124, 184, 66, 0.12)',
    borderColor: theme.colors.brightFern,
    borderWidth: 1.5,
  },
  supportCardContent: {
    flex: 1,
  },
  supportCardTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: theme.fontFamily.bold,
  },
  supportCardSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontFamily: theme.fontFamily.regular,
    marginTop: 4,
  },
  supportCardIcon: {
    marginRight: 16,
  },
  backLink: {
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 12,
  },
  backLinkText: {
    color: "#e2c68a",
    fontFamily: theme.fontFamily.semiBold,
    fontSize: 14,
  },
});
