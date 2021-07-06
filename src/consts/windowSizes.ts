const windowSizes = {
  xl: { min: 1200 },
  lg: { min: 992, max: 1199 },
  md: { min: 768, max: 991 },
  sm: { min: 576, max: 767 },
  xs: { max: 575 }
}

//@xl: ~"only screen and (min-width: 1200px)";
//@lg: ~"only screen and (min-width: 992px) and (max-width: 1119px)";
//@md: ~"only screen and (min-width: 768px) and (max-width: 991px)";
//@sm: ~"only screen and (min-width: 576px) and (max-width: 767px)";
//@xs: ~"only screen and (max-width: 575px)";

export default windowSizes;