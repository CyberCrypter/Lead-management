import Lead from "../models/Lead.js";

const toLeadResponse = (lead) => ({
  id: lead._id,
  name: lead.name,
  email: lead.email,
  phone: lead.phone,
  status: lead.status,
  responseMessage: lead.responseMessage,
  notes: lead.notes,
  attachment: lead.attachment,
  createdAt: lead.createdAt,
  updatedAt: lead.updatedAt,
});

export const createLead = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      createdBy: req.admin._id,
      attachment: req.file ? `/uploads/${req.file.filename}` : "",
    };

    const lead = await Lead.create(payload);
    return res.status(201).json({
      message: "Lead created",
      lead: toLeadResponse(lead),
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    const { status, search = "" } = req.query;

    const query = { createdBy: req.admin._id };

    if (status) {
      query.status = status;
    }

    if (search.trim()) {
      const regex = { $regex: search.trim(), $options: "i" };
      query.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      count: leads.length,
      leads: leads.map(toLeadResponse),
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      createdBy: req.admin._id,
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json({ lead: toLeadResponse(lead) });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const updates = {
      ...req.body,
    };

    if (req.file) {
      updates.attachment = `/uploads/${req.file.filename}`;
    }

    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.admin._id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json({
      message: "Lead updated",
      lead: toLeadResponse(lead),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.admin._id,
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json({ message: "Lead deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateLeadStatus = async (req, res, next) => {
  try {
    const { status, responseMessage = "" } = req.body;

    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.admin._id },
      { $set: { status, responseMessage } },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    if (status !== "New") {
      console.log(`Lead ${lead.email} moved to status ${status}`);
    }

    return res.status(200).json({
      message: "Lead status updated",
      lead: toLeadResponse(lead),
    });
  } catch (error) {
    next(error);
  }
};
