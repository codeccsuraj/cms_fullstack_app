import mongoose from 'mongoose';

const AddressSchemaDocument = new mongoose.Schema(
    {
        locality: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        zipcode: { type: String, required: true, trim: true },
        livingFrom: { type: Date, default: null },
        livingType: { type: String },
        isActive: { type: Boolean, default: false }
    }, { timestamps: true }
);

const EducationSchemaDocument = new mongoose.Schema(
    {
        type: { type: String, enum: ["matric", "secondary", "graduation", "post-graduation", "diploma"], required: true, trim: true },
        educationType: { type: String, enum: ["regular", "distance"], required: true, trim: true },
        university: { type: String, required: true, trim: true },
        institute: { type: String, required: true, trim: true },
        course: { type: String, required: true, trim: true },
        subjects: { type: [String], default: [] },
        started: { type: Date, required: true },
        ended: { type: Date, default: null },
        isActive: { type: Boolean, default: false },
        cgpa: { type: Number, min: 0, max: 10, default: 0 },
        grade: { type: String, trim: true },
        percentage: { type: Number, min: 0, max: 100, default: 0, },
        professorEmail: { type: String, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, "Invalid email format"] },
        city: { type: String, trim: true },
        isConsentReceived: { type: Boolean, default: false },
    },
    { timestamps: true }
);


const ExperienceSchemaDocument = new mongoose.Schema(
    {
        company: { type: String, required: true, trim: true },
        role: { type: String, required: true, trim: true },
        jobType: { type: String, enum: ["full-time", "part-time", "internship", "contract", "freelance"], required: true, trim: true },
        started: { type: Date, required: true },
        ended: { type: Date, default: null },
        isActive: { type: Boolean, default: false },
        description: { type: String, required: true, trim: true },
        skills: { type: [String], default: [] },
        city: { type: String, required: true, trim: true },
        ctc: { type: Number, min: 0, required: true },
        contactPerson: {
            name: { type: String, trim: true },
            email: { type: String, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, "Invalid email format"] },
            phone: { type: String, trim: true }
        },
        companyEmail: { type: String, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, "Invalid email format"] },
        website: { type: String, trim: true },
        isConsentReceived: { type: Boolean, default: false },
    },
    { timestamps: true }
);


const SkillSchemaDocument = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        level: { type: String, enum: ["beginner", "intermediate", "advanced", "expert"], required: true },
        yearsOfExperience: { type: Number, min: 0, max: 50, required: true },
    },
    { timestamps: true }
);


const DocumentSchemaDocument = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        type: { type: String, enum: ["aadhaar", "pan", "passport", "driving-license", "resume", "offer-letter", "experience-letter", "marksheet", "certificate"], required: true },
        documentNumber: { type: String, required: false, trim: true },
        fileUrl: { type: String, required: false, trim: true },
        isVerified: { type: Boolean, default: false },
        isConsentReceived: { type: Boolean, default: false, }
    },
    { timestamps: true }
);


const ProjectSchemaDocument = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, trim: true, lowercase: true },
        shortDescription: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        started: { type: Date, required: true },
        ended: { type: Date, default: null },
        isActive: { type: Boolean, default: false },
        tags: { type: [String], default: [] },
    },
    { timestamps: true }
);


const CertificateSchemaDocument = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        type: { type: String, enum: ["course", "professional", "participation", "achievement", "training"], required: true },
        issuedAt: { type: Date, required: true },
        provider: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        credentialId: { type: String, trim: true },
        credentialUrl: { type: String, trim: true },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);


const LinksSchemaDocument = new mongoose.Schema(
    {
        type: { type: String, enum: [ "github", "linkedin", "portfolio", "website", "twitter", "leetcode", "hackerrank", "codechef", "medium", "other" ], required: true },
        url: { type: String, required: true, trim: true, match: [/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,"Invalid URL format" ] },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);


const UserDocumentSchema = new mongoose.Schema(
    {
        authId: { type: String, required: true, index: true, unique: true },
        profilePic: { type: String, required: false },
        firstName: { type: String, required: true, lowercase: true, trim: true },
        middleName: { type: String, lowercase: true, trim: true, required : false },
        lastName: { type: String, required: true, lowercase: true, trim: true },
        gender: { type: String, required: true, enum: ["male", "female", "other"] },
        dob: { type: Date },
        nationality: { type: String, trim: true },
        maritalStatus: { type: String, enum: ["single", "married", "divorced", "widowed"] },
        bio: { type: String },
        description: { type: String },
        altEmail: { type: String, lowercase: true, trim: true },
        altMobile: { type: String, trim: true },
        motherName: { type: String, trim: true },
        fatherName: { type: String, trim: true },
        address: { type: AddressSchemaDocument, required: false, default: null },
        education: { type: [EducationSchemaDocument], required: false, default: [] },
        experience: { type: [ExperienceSchemaDocument], required: false, default: [] },
        skills: { type: [SkillSchemaDocument], required: false, default: [] },
        projects: { type: [ProjectSchemaDocument], required: false, default: [] },
        documents: { type: [DocumentSchemaDocument], required: false, default: [] },
        links: { type: [LinksSchemaDocument], required: false, default: [] },
        certificates: { type: [CertificateSchemaDocument], required: false, default: [] },
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model('User', UserDocumentSchema);
export default UserModel;