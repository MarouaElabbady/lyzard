import { useState, useRef, useCallback } from 'react';

interface UseSSEStreamOptions {
  onChunk?: (chunk: string) => void;
  onDone?: (fullCode: string) => void;
  onError?: (error: Error) => void;
}

export function useSSEStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedCode, setStreamedCode] = useState('');
  const eventSourceRef = useRef<EventSource | null>(null);

  const startStream = useCallback((url: string, options?: UseSSEStreamOptions) => {
    setIsStreaming(true);
    setStreamedCode('');

    // Ensure previous connections are closed
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    let fullOutput = '';

    eventSource.onmessage = (event) => {
      if (event.data === '[DONE]') {
        eventSource.close();
        setIsStreaming(false);
        options?.onDone?.(fullOutput);
        return;
      }

      try {
        const data = JSON.parse(event.data);
        const chunk = data.chunk || '';
        fullOutput += chunk;
        setStreamedCode((prev) => prev + chunk);
        options?.onChunk?.(chunk);
      } catch (err) {
        console.error('Failed to parse SSE data:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      eventSource.close();
      setIsStreaming(false);
      options?.onError?.(new Error('Stream disconnected unexpectedly'));
    };

    return () => {
      eventSource.close();
      setIsStreaming(false);
    };
  }, []);

  const stopStream = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      setIsStreaming(false);
    }
  }, []);

  return {
    isStreaming,
    streamedCode,
    startStream,
    stopStream,
  };
}
