import mongoose from "mongoose";

const logoSchema = mongoose.Schema(
  {
    headerLogo: {
      type: String,
      default: 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640',
    },
    sidebarLogo: {
      type: String,
      default: 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640',
    },
    mobileLogo: {
      type: String,
      default: 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640',
    },
    footerLogo: {
      type: String,
      default: 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640',
    },
  },
  {timestamps: true},
)

const Logo = mongoose.model('Logo', logoSchema)

export default Logo