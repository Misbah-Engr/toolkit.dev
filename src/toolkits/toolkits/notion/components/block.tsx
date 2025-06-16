import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Helper function to render rich text
const renderRichText = (richText: RichTextItemResponse[]): React.ReactNode => {
  return richText.map((text, index) => {
    let element = <span key={index}>{text.plain_text}</span>;

    if (text.annotations.bold)
      element = <strong key={index}>{text.plain_text}</strong>;
    if (text.annotations.italic)
      element = <em key={index}>{text.plain_text}</em>;
    if (text.annotations.strikethrough)
      element = <s key={index}>{text.plain_text}</s>;
    if (text.annotations.underline)
      element = <u key={index}>{text.plain_text}</u>;
    if (text.annotations.code)
      element = (
        <code key={index} className="bg-muted rounded px-1 text-sm">
          {text.plain_text}
        </code>
      );

    if (text.type === "text" && text.text.link) {
      element = (
        <a
          key={index}
          href={text.text.link.url}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {element}
        </a>
      );
    }

    return element;
  });
};

export const NotionBlock: React.FC<{ block: BlockObjectResponse }> = ({
  block,
}) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-2">{renderRichText(block.paragraph.rich_text)}</p>
      );

    case "heading_1":
      return (
        <h1 className="mt-4 mb-3 text-2xl font-bold">
          {renderRichText(block.heading_1.rich_text)}
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="mt-3 mb-2 text-xl font-bold">
          {renderRichText(block.heading_2.rich_text)}
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="mt-3 mb-2 text-lg font-bold">
          {renderRichText(block.heading_3.rich_text)}
        </h3>
      );

    case "bulleted_list_item":
      return (
        <div className="mb-1 flex items-start">
          <span className="mt-1 mr-2">•</span>
          <div>{renderRichText(block.bulleted_list_item.rich_text)}</div>
        </div>
      );

    case "numbered_list_item":
      return (
        <div className="mb-1 flex items-start">
          <span className="mt-1 mr-2">1.</span>
          <div>{renderRichText(block.numbered_list_item.rich_text)}</div>
        </div>
      );

    case "to_do":
      return (
        <div className="mb-1 flex items-start">
          <input
            type="checkbox"
            checked={block.to_do.checked}
            readOnly
            className="mt-1 mr-2"
          />
          <div
            className={
              block.to_do.checked ? "text-muted-foreground line-through" : ""
            }
          >
            {renderRichText(block.to_do.rich_text)}
          </div>
        </div>
      );

    case "quote":
      return (
        <blockquote className="border-muted text-muted-foreground my-2 border-l-4 pl-4 italic">
          {renderRichText(block.quote.rich_text)}
        </blockquote>
      );

    case "code":
      return (
        <pre className="bg-muted mb-2 overflow-x-auto rounded p-3">
          <code className="text-sm">
            {block.code.rich_text.map((text) => text.plain_text).join("")}
          </code>
        </pre>
      );

    case "callout":
      return (
        <div className="bg-muted/50 mb-2 rounded border-l-4 border-blue-500 p-3">
          <div className="flex items-start">
            {block.callout.icon && block.callout.icon.type === "emoji" && (
              <span className="mr-2">{block.callout.icon.emoji}</span>
            )}
            <div>{renderRichText(block.callout.rich_text)}</div>
          </div>
        </div>
      );

    case "toggle":
      return (
        <details className="mb-2">
          <summary className="hover:bg-muted/50 cursor-pointer rounded p-1">
            {renderRichText(block.toggle.rich_text)}
          </summary>
        </details>
      );

    case "divider":
      return <hr className="border-muted my-4" />;

    case "image":
      const imageUrl =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
      return (
        <div className="my-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Notion image"
            className="max-w-full rounded"
          />
          {block.image.caption.length > 0 && (
            <p className="text-muted-foreground mt-1 text-sm">
              {renderRichText(block.image.caption)}
            </p>
          )}
        </div>
      );

    case "video":
      const videoUrl =
        block.video.type === "external"
          ? block.video.external.url
          : block.video.file.url;
      return (
        <div className="my-3">
          <video controls className="max-w-full rounded">
            <source src={videoUrl} />
          </video>
          {block.video.caption.length > 0 && (
            <p className="text-muted-foreground mt-1 text-sm">
              {renderRichText(block.video.caption)}
            </p>
          )}
        </div>
      );

    case "file":
      const fileUrl =
        block.file.type === "external"
          ? block.file.external.url
          : block.file.file.url;
      return (
        <div className="my-2">
          <a
            href={fileUrl}
            className="flex items-center text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            📎 {block.file.name || "Download file"}
          </a>
          {block.file.caption.length > 0 && (
            <p className="text-muted-foreground mt-1 text-sm">
              {renderRichText(block.file.caption)}
            </p>
          )}
        </div>
      );

    case "bookmark":
      return (
        <div className="hover:bg-muted/50 my-2 rounded border p-3">
          <a
            href={block.bookmark.url}
            className="block text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 {block.bookmark.url}
          </a>
          {block.bookmark.caption.length > 0 && (
            <p className="text-muted-foreground mt-1 text-sm">
              {renderRichText(block.bookmark.caption)}
            </p>
          )}
        </div>
      );

    case "embed":
      return (
        <div className="my-2 rounded border p-3">
          <a
            href={block.embed.url}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            🌐 {block.embed.url}
          </a>
          {block.embed.caption.length > 0 && (
            <p className="text-muted-foreground mt-1 text-sm">
              {renderRichText(block.embed.caption)}
            </p>
          )}
        </div>
      );

    case "equation":
      return (
        <div className="bg-muted/30 my-2 rounded p-2 text-center font-mono">
          {block.equation.expression}
        </div>
      );

    case "table":
      return (
        <div className="my-3">
          <div className="text-muted-foreground mb-1 text-sm">
            Table ({block.table.table_width} columns)
          </div>
        </div>
      );

    case "table_row":
      return (
        <div
          className="grid gap-2 border-b py-1"
          style={{
            gridTemplateColumns: `repeat(${block.table_row.cells.length}, 1fr)`,
          }}
        >
          {block.table_row.cells.map((cell, index) => (
            <div key={index} className="px-2">
              {renderRichText(cell)}
            </div>
          ))}
        </div>
      );

    case "child_page":
      return (
        <div className="bg-muted/30 my-2 rounded border p-2">
          📄 {block.child_page.title}
        </div>
      );

    case "child_database":
      return (
        <div className="bg-muted/30 my-2 rounded border p-2">
          🗂️ {block.child_database.title}
        </div>
      );

    case "link_to_page":
      return (
        <div className="my-2">
          <span className="text-blue-600">🔗 Link to page</span>
        </div>
      );

    case "table_of_contents":
      return (
        <div className="text-muted-foreground my-2 text-sm">
          📋 Table of Contents
        </div>
      );

    case "breadcrumb":
      return (
        <div className="text-muted-foreground my-2 text-sm">🏠 Breadcrumb</div>
      );

    case "column_list":
      return <div className="my-2">📐 Column List</div>;

    case "column":
      return <div className="my-2">📐 Column</div>;

    case "template":
      return (
        <div className="border-muted my-2 rounded border-2 border-dashed p-2">
          📋 Template: {renderRichText(block.template.rich_text)}
        </div>
      );

    case "synced_block":
      return (
        <div className="my-2 rounded border bg-blue-50 p-2">
          🔄 Synced Block
        </div>
      );

    case "pdf":
      const pdfUrl =
        block.pdf.type === "external"
          ? block.pdf.external.url
          : block.pdf.file.url;
      return (
        <div className="my-2">
          <a
            href={pdfUrl}
            className="flex items-center text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            📄 View PDF
          </a>
          {block.pdf.caption.length > 0 && (
            <p className="text-muted-foreground mt-1 text-sm">
              {renderRichText(block.pdf.caption)}
            </p>
          )}
        </div>
      );

    case "audio":
      const audioUrl =
        block.audio.type === "external"
          ? block.audio.external.url
          : block.audio.file.url;
      return (
        <div className="my-3">
          <audio controls className="w-full">
            <source src={audioUrl} />
          </audio>
          {block.audio.caption.length > 0 && (
            <p className="text-muted-foreground mt-1 text-sm">
              {renderRichText(block.audio.caption)}
            </p>
          )}
        </div>
      );

    case "link_preview":
      return (
        <div className="my-2 rounded border p-3">
          <a
            href={block.link_preview.url}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 {block.link_preview.url}
          </a>
        </div>
      );

    case "unsupported":
      return (
        <div className="text-muted-foreground my-2 text-sm italic">
          ⚠️ Unsupported block type
        </div>
      );

    default:
      return (
        <div className="text-muted-foreground my-2 text-sm">
          Unknown block type
        </div>
      );
  }
};
