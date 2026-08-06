/**
 * Enterprise Audit Logger & Event Dispatcher for Kadadi Motors
 * Logs user interaction telemetry, form validation metrics, and desk session events.
 */

export interface AuditLogEvent {
  id: string;
  timestamp: string;
  eventType: 'VALIDATION' | 'INQUIRY' | 'SEARCH' | 'PORTAL' | 'SYSTEM';
  action: string;
  payload?: Record<string, unknown>;
  severity: 'info' | 'warn' | 'error';
}

class AuditLogger {
  private logs: AuditLogEvent[] = [];
  private maxLogs = 500;

  constructor() {
    this.log('SYSTEM', 'Audit Logger initialized in high-precision mode', { version: '1.0.0' }, 'info');
  }

  public log(
    eventType: AuditLogEvent['eventType'],
    action: string,
    payload?: Record<string, unknown>,
    severity: AuditLogEvent['severity'] = 'info'
  ): AuditLogEvent {
    const event: AuditLogEvent = {
      id: `EVT-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      eventType,
      action,
      payload,
      severity,
    };

    this.logs.unshift(event);
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[AUDIT::${severity.toUpperCase()}] [${eventType}] ${action}`, payload || '');
    }

    return event;
  }

  public getLogs(): AuditLogEvent[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }
}

export const auditLogger = new AuditLogger();
