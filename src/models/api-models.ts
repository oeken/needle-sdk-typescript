import { z } from "zod";

export const ApiErrorSchema = z.object({
  error: z.object({
    message: z.string(),
    data: z.unknown().optional(),
  }),
});

// Sessions
const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  plan: z.string(),
  confirmed_at: z.string().transform((str) => new Date(str)),
  created_at: z.string().transform((str) => new Date(str)),
});

export type User = z.infer<typeof UserSchema>;

const SessionSchema = z.object({
  id: z.string(),
  expires_at: z.string().transform((str) => new Date(str)),
  fresh: z.boolean(),
  user_id: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;

export const ValidateSessionResponseSchema = z.object({
  result: z.object({
    user: UserSchema.optional().nullable(),
    session: SessionSchema.optional().nullable(),
  }),
});

// Files
export const FileTypeSchema = z.enum([
  // google
  "application/vnd.google-apps.document",
  "application/vnd.google-apps.presentation",
  "application/vnd.google-apps.spreadsheet",
  // open formats
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // microsoft
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  // text
  "text/csv",
  "text/html",
  "text/calendar",
  "text/plain",
]);

export type FileType = z.infer<typeof FileTypeSchema>;

// Connectors
export const ConnectorSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string().transform((str) => new Date(str)),
  type: z.string(),
  cron_job: z.string(),
  timezone: z.string(),
  credentials: z.string().optional().nullable(),
  error: z.string().nullable(),
});

export type Connector = z.infer<typeof ConnectorSchema>;

export const GetConnectorResponseSchema = z.object({
  result: ConnectorSchema,
});

export const ListConnectorsResponseSchema = z.object({
  result: z.array(ConnectorSchema),
});

export const CreateConnectorRequestSchema = z.object({
  name: z.string().min(1, "Cannot be empty").max(255),
  cronJob: z.string(),
  cronJobTimezone: z.string(),
  collectionIds: z.array(z.string()),
  credentials: z.string().optional().nullable(),
});

export type CreateConnectorRequest = z.infer<
  typeof CreateConnectorRequestSchema
>;

export const CreateConnectorResponseSchema = z.object({
  result: ConnectorSchema,
});

export const CreateFileActionSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  type: FileTypeSchema,
});

export type CreateFileAction = z.infer<typeof CreateFileActionSchema>;

export const UpdateFileActionSchema = z.object({
  id: z.string(),
});

export type UpdateFileAction = z.infer<typeof UpdateFileActionSchema>;

export const DeleteFileActionSchema = z.object({
  id: z.string(),
});

export type DeleteFileAction = z.infer<typeof DeleteFileActionSchema>;

export const ConnectorRunDescriptorSchema = z.object({
  create: z.array(CreateFileActionSchema),
  update: z.array(UpdateFileActionSchema),
  delete: z.array(DeleteFileActionSchema),
});

export type ConnectorRunDescriptor = z.infer<
  typeof ConnectorRunDescriptorSchema
>;

// Collections
export const CollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Collection = z.infer<typeof CollectionSchema>;

export const ListCollectionsResponseSchema = z.object({
  result: z.array(CollectionSchema),
});
