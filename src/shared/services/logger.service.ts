import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(message: string, context?: string): string {
    return `[${this.getTimestamp()}] ${context ? `[${context}] ` : ''}${message}`;
  }

  log(message: string, context?: string): void {
    console.log(this.formatMessage(message, context));
  }

  error(message: string, trace?: string, context?: string): void {
    console.error(this.formatMessage(message, context));
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: string, context?: string): void {
    console.warn(this.formatMessage(message, context));
  }

  debug(message: string, context?: string): void {
    console.debug(this.formatMessage(message, context));
  }

  verbose(message: string, context?: string): void {
    console.info(this.formatMessage(message, context));
  }
}
