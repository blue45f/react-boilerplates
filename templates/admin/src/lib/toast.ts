import { App } from 'antd';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export function useToast() {
  const { message, notification } = App.useApp();

  return {
    success(content: string) {
      message.success(content);
    },
    error(content: string) {
      message.error(content);
    },
    info(content: string) {
      message.info(content);
    },
    warning(content: string) {
      message.warning(content);
    },
    notify(args: { type?: ToastVariant; title: string; description?: string }) {
      notification[args.type ?? 'info']({
        message: args.title,
        description: args.description,
        placement: 'topRight',
      });
    },
  };
}
