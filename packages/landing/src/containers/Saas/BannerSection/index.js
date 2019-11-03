import React from 'react';
import PropTypes from 'prop-types';
import Box from 'reusecore/src/elements/Box';
import Text from 'reusecore/src/elements/Text';
import Image from 'reusecore/src/elements/Image';
import Heading from 'reusecore/src/elements/Heading';
import Button from 'reusecore/src/elements/Button';
import FeatureBlock from 'common/src/components/FeatureBlock';
import Container from 'common/src/components/UI/Container';
import Particles from '../Particle';
import BannerWrapper, { BannerObject } from './bannerSection.style';
import Survey from '../../../components/Survey/Survey';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import BannerObject1 from 'common/src/assets/image/saas/banner/bannerObject1.png';
import BannerObject2, {
  ReactComponent as Svgdemo,
} from 'common/src/assets/image/saas/banner/Landing-Demo.svg';


const BannerSection = ({
  row,
  col,
  title,
  btnStyle,
  description,
  imageWrapper,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClickAway = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <BannerWrapper id="banner_section">
      <Particles />
      <Container>
        <Box className="row" {...row}>
          <Box className="col" {...col}>
            <FeatureBlock
              title={
                <Heading
                  content="Agile Experiments for your SaaS Products"
                  {...title}
                />
              }
              description={
                <Text
                  content="A NO-CODE product feedback solution that's 10x better for you and your team. Harness the power of qual and quant feedback with minimally intrusive in-app surveys to understand your users. It's like Heap Analytics without wasting time guessing what all the metrics mean."
                  {...description}
                />
              }
              button={
                <>
                  <Button
                    title="GET STARTED"
                    aria-describedby={id}
                    onClick={handleClick}
                    {...btnStyle}
                  />
                  <Survey id={id} open={open} anchorEl={anchorEl} handleClickAway={handleClickAway} placement="right" />
                </>
              }
            />
          </Box>
        </Box>
      </Container>
      <BannerObject>
        <div className="objectWrapper">
          <Image src={BannerObject1} alt="BannerObject1" />
          <Box {...imageWrapper} className="dashboardWrapper">
            <img src={BannerObject2} alt="Demo" />
            <Svgdemo />
          </Box>
        </div>
      </BannerObject>
    </BannerWrapper>
  );
};

BannerSection.propTypes = {
  title: PropTypes.object,
  btnStyle: PropTypes.object,
  description: PropTypes.object,
  contentStyle: PropTypes.object,
  discountText: PropTypes.object,
  discountAmount: PropTypes.object,
  outlineBtnStyle: PropTypes.object,
};

BannerSection.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
    alignItems: 'center',
  },
  col: {
    pr: '15px',
    pl: '15px',
    width: [1, '70%', '50%', '45%'],
  },
  title: {
    fontSize: ['22px', '34px', '30px', '55px'],
    fontWeight: '700',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: ['20px', '25px'],
    lineHeight: '1.5',
  },
  description: {
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '1.75',
    mb: '0',
  },
  btnStyle: {
    minWidth: ['120px', '120px', '120px', '156px'],
    fontSize: ['13px', '14px'],
    fontWeight: '500',
    colors: 'primaryWithBg',
  },
  outlineBtnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#5167db',
    ml: '18px',
  },
  discountAmount: {
    fontSize: '14px',
    color: '#eb4d4b',
    mb: 0,
    as: 'span',
    mr: '0.4em',
    fontWeight: 700,
  },
  discountText: {
    fontSize: ['13px', '14px'],
    color: '#0f2137',
    mb: 0,
    as: 'span',
    fontWeight: 500,
  },
};

export default BannerSection;
