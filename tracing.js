import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

// Set up logging for debugging
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// Create a new tracer provider
const provider = new WebTracerProvider();

// Configure OpenTelemetry Collector (Replace with your OTEL Collector URL)
const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces', // Change to your OTEL Collector
  headers: {},
});

// Set up span processor and exporter
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter())); // Console output
provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter)); // Send to OTEL collector

// Register the provider
provider.register({
  contextManager: new ZoneContextManager(),
});

// Add instrumentation for Fetch and XHR
registerInstrumentations({
  instrumentations: [new FetchInstrumentation(), new XMLHttpRequestInstrumentation()],
});

console.log('✅ OpenTelemetry initialized for Vite React app');
