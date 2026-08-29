import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const PortfolioItemSchema = new Schema(
  {
    src: { type: String, required: true },
    category: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ExperienceSchema = new Schema(
  {
    icon: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    date: { type: String, default: "" },
    color: { type: String, default: "cyan" },
  },
  { timestamps: true }
);

const SkillSchema = new Schema(
  {
    icon: { type: String, default: "" },
    name: { type: String, default: "" },
    target: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const AwardSchema = new Schema(
  {
    date: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const SiteSettingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String, default: "" },
  },
  { timestamps: true }
);

export const PortfolioItem =
  models.PortfolioItem || model("PortfolioItem", PortfolioItemSchema);
export const Experience =
  models.Experience || model("Experience", ExperienceSchema);
export const Skill = models.Skill || model("Skill", SkillSchema);
export const Award = models.Award || model("Award", AwardSchema);
export const SiteSetting =
  models.SiteSetting || model("SiteSetting", SiteSettingSchema);

export function toItemJson(doc) {
  const d = doc.toObject ? doc.toObject() : doc;
  return { id: String(d._id ?? d.id), ...d };
}

export function stripId(doc) {
  const d = doc.toObject ? doc.toObject() : doc;
  const { _id, __v, ...rest } = d;
  return rest;
}
