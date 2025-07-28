import BaseLink from "next/link";

export const Link = ({
  href,
  children,
}: {
  href: string;
  children: string;
}) => {
  return (
    <BaseLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline"
    >
      {children}
    </BaseLink>
  );
};
