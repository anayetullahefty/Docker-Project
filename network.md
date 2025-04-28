# Network Design

## Assumptions
- Headquarters: Melbourne, Australia.
- Branch Offices: Sydney, Brisbane, Perth.
- Headquarters Staff: 60.
- Sydney Branch Staff: 20.

## Network Design
### Headquarters
- **Diagram**: [network_hq.png](network_hq.png)
- **Topology**: Star topology with core switch.
- **Subnets**:
  - Admin: `78.1.1.0/24`
  - IT: `78.1.2.0/24`
  - Consultants: `78.1.3.0/24`
  - WiFi: `78.1.4.0/24`
  - Security: `78.1.5.0/24`
- **WiFi**: WPA3-Enterprise (staff), WPA3-Personal (guest), AES, channels 1/6/11.
- **Hardware**:
  - Router: Cisco RV340 (~AUD 300) [Link].
  - Switch: Netgear GS752TP (~AUD 600) [Link].
  - WAPs: Ubiquiti UniFi 6 Lite (~AUD 150 each, 4 units) [Link].
  - Firewall: Fortinet FortiGate 40F (~AUD 500) [Link].

### Sydney Branch
- **Diagram**: [network_branch.png](network_branch.png)
- **Subnet**: `78.2.1.0/24` (wired), `78.2.2.0/24` (WiFi).
- **Hardware**: Cisco RV160 (~AUD 200), Netgear GS724T (~AUD 300), UniFi 6 Lite (~AUD 150).
