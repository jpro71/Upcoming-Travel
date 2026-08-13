import { NextResponse } from "next/server";

import {
  createDocumentSignedUrlServer,
  getDocumentServer,
} from "@/lib/documentServerService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const documentId = Number(id);

  if (!Number.isFinite(documentId)) {
    return NextResponse.json(
      { error: "Invalid document ID." },
      { status: 400 }
    );
  }

  const document = await getDocumentServer(documentId);

  if (!document) {
    return NextResponse.json(
      { error: "Document not found." },
      { status: 404 }
    );
  }

  try {
    const signedUrl =
      await createDocumentSignedUrlServer(
        document.filePath
      );

    return NextResponse.redirect(signedUrl);
  } catch (error) {
    console.error("Error creating document view URL:", error);

    return NextResponse.json(
      { error: "Unable to open document." },
      { status: 500 }
    );
  }
}