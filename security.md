# Security
## Risk Assessment
- **Highest-Risk Asset**: Customer PII (Risk Score: 20).
- **Threats**: Unauthorized access, data breach, malware, phishing, etc.
- **Spreadsheet**: [risk.xlsx](risk.xlsx), [TVAMatrix.png](TVAMatrix.png).

## Controls
1. **Access Control**: RBAC with MFA (Okta), restricts PII server access, reduces unauthorized access risk.
2. **Encryption**: AES-256 (at rest), TLS 1.3 (in transit), prevents data exposure.
3. **IDS**: Snort on FortiGate 40F, monitors PII server traffic, detects breaches.
