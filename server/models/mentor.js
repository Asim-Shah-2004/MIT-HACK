import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MentorSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['SME', 'Investor', 'Mentor'],
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    location: {
      country: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
    },
    profilePicture: {
      data: Buffer,
      contentType: String,
    },
    experienceSummary: {
      type: String,
      required: false,
    },
    specializedIndustries: {
      type: [String],
      enum: ['Tech', 'Marketing', 'Finance', 'Other'],
      required: false,
    },
    mentorshipAreas: {
      type: [String],
      enum: [
        'Business Strategy',
        'Finance',
        'Marketing',
        'Leadership',
        'Growth Hacking',
        'Operations',
        'Other',
      ],
      required: false,
    },
    timeCommitment: {
      type: String,
      enum: ['5-10 hours', '10-20 hours', 'Flexible'],
      required: false,
    },
    businessPreferences: {
      type: [String],
      enum: [
        'Startups',
        'Growth-Stage Companies',
        'Rural Enterprises',
      ],
      required: false,
    },
    proBonoRural: {
      type: Boolean,
      required: false,
    },
    successStories: {
      type: String,
      default: '',
    },
    chats: [
      {
        personName: {
          type: String,
          required: true,
        },
        chatId: {
          type: String,
          required: true,
        },
      },
    ],
    proposals: [
      {
        proposalId: {
          type: String,
          required: true,
          unique: true,
        },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'rejected'],
          default: 'pending',
        },
      },
    ],
    posts: [
      {
        postId: {
          type: String,
          required: true,
        },
      },
    ],
    events: [
      {
        type: String,
      }
    ]
  },
  { collection: 'Mentor' }
);

const Mentor = mongoose.model('Mentor', MentorSchema);

export default Mentor;
