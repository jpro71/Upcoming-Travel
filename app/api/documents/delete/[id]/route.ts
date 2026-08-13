import { NextResponse } from "next/server";

import {
  deleteDocumentServer,
  getDocumentServer,
} from "@/lib/documentServerService";

export async function DELETE(
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
    await deleteDocumentServer(
      documentId,
      document.filePath
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting document:", error);

    return NextResponse.json(
      { error: "Unable to delete document." },
      { status: 500 }
    );
  }
}