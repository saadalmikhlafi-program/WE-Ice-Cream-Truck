import { prisma } from "@/lib/prisma";

export interface CreateAuditLogParams {
  entityType: string;
  entityId: string;
  action: string;
  actorId?: string;
  userRole?: string;
  aiType?: "CUSTOMER_AI" | "ADMIN_AI" | "NONE";
  aiProvider?: string;
  aiModel?: string;
  previousValue?: any;
  newValue?: any;
  result?: "SUCCESS" | "FAILED" | "PENDING";
  errors?: any;
  requestId?: string;
  sessionId?: string;
  metadataJson?: any;
  bookingId?: string;
}

export const AuditService = {
  async log(params: CreateAuditLogParams) {
    try {
      await prisma.auditLog.create({
        data: {
          entityType: params.entityType,
          entityId: params.entityId,
          action: params.action,
          actorId: params.actorId,
          userRole: params.userRole,
          aiType: params.aiType,
          aiProvider: params.aiProvider,
          aiModel: params.aiModel,
          previousValue: params.previousValue ? JSON.stringify(params.previousValue) : null,
          newValue: params.newValue ? JSON.stringify(params.newValue) : null,
          result: params.result,
          errors: params.errors ? JSON.stringify(params.errors) : null,
          requestId: params.requestId,
          sessionId: params.sessionId,
          metadataJson: params.metadataJson ? JSON.stringify(params.metadataJson) : null,
          bookingId: params.bookingId,
        },
      });
    } catch (error) {
      console.error("[AuditService] Failed to create audit log:", error);
    }
  },
};
