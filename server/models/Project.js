const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'Untitled Website'
    },
    prompt: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    // files is a map of filename -> code content
    // e.g. { "App.js": "...", "styles.css": "...", "index.html": "..." }
    files: {
      type: Map,
      of: String,
      default: {}
    },
    templateType: {
      type: String,
      default: 'react' // 'react' | 'html'
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    likesCount: {
      type: Number,
      default: 0
    },
    thumbnail: {
      type: String,
      default: ''
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    versions: [
      {
        prompt: String,
        timestamp: {
          type: Date,
          default: Date.now
        },
        filesSnapshot: {
          type: Map,
          of: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const ProjectModel = mongoose.models.Project || mongoose.model('Project', projectSchema);
module.exports = ProjectModel;
