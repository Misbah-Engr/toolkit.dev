export default function WorkbenchChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-0 flex-1 overflow-hidden">{children}</div>;
}
