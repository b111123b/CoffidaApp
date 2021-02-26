/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';

const tan = '#a85219';
const bone = '#d9cfc1';
const bistre = '#2b2118';
const white = '#ffffff';

export const Styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: bone,
  },
  mainTitle: {
    fontSize: 32,
    color: bistre,
    marginBottom: 20,
    alignSelf: 'center',
    fontFamily: 'WorkSans-Bold',
  },
  title: {
    fontSize: 32,
    color: bistre,
    marginBottom: 20,
    marginLeft: 18,
    fontFamily: 'WorkSans-Bold',
  },
  homeTitle: {
    fontSize: 32,
    color: bistre,
    marginBottom: 20,
    marginLeft: 36,
    fontFamily: 'WorkSans-Bold',
  },
  userTitle: {
    fontSize: 32,
    color: bistre,
    marginLeft: 18,
    fontFamily: 'WorkSans-Bold',
  },
  itemTitle: {
    fontSize: 32,
    color: bistre,
    marginBottom: 20,
    fontFamily: 'WorkSans-SemiBold',
  },
  itemIcon: {
    flex: 2,
  },
  userIcon: {
    flex: 2,
    marginBottom: 16,
    marginRight: 16,
  },
  subTitle: {
    fontSize: 18,
    fontFamily: 'WorkSans-Medium',
  },
  userDetail: {
    fontSize: 18,
    marginLeft: 18,
    marginBottom: 5,
    fontFamily: 'WorkSans-Medium',
  },
  locationDetails: {
    fontSize: 18,
    marginLeft: 18,
    fontFamily: 'WorkSans-Medium',
  },
  container: {
    backgroundColor: white,
    flex: 1,
    width: '100%',
  },
  cardBackground: {
    backgroundColor: '#eee3ab',
  },
  itemContainer: {
    flexDirection: 'row',
  },
  itemImage: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: 50,
    width: 50,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: 100,
  },
  icon: {
    resizeMode: 'contain',
    height: 50,
    width: 50,
    alignSelf: 'flex-end',
  },
  centerImage: {
    marginBottom: 40,
    marginTop: 40,
    alignSelf: 'center',
    height: 150,
    width: 150,
  },
  inputView: {
    backgroundColor: bone,
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignSelf: 'center',
  },
  bodyView: {
    backgroundColor: bone,
    borderRadius: 30,
    width: '70%',
    height: 85,
    marginBottom: 20,
    alignSelf: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  TextInputPassword: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: tan,
  },
  reviewBtn: {
    width: '100%',
    // borderRadius: 25,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: tan,
  },
  btnText: {
    fontSize: 18,
    color: white,
    fontFamily: 'WorkSans-Medium',
  },
  reviewImage: {
    height: 100,
    resizeMode: 'contain',
  },
});

/* CSS HSL */
/* --windsor-tan: hsla(24, 74%, 38%, 1);
--air-superiority-blue: hsla(210, 34%, 63%, 1);
--medium-champagne: hsla(50, 66%, 80%, 1);
--bone: hsla(35, 24%, 80%, 1);
--bistre: hsla(28, 28%, 13%, 1); */

/* SCSS HEX */
/* $windsor-tan: #a85219;
$air-superiority-blue: #80a1c1;
$medium-champagne: #eee3abff;
$bone: #d9cfc1ff;
$bistre: #2b2118ff; */

/* SCSS HSL */
/* $windsor-tan: hsla(24, 74%, 38%, 1);
$air-superiority-blue: hsla(210, 34%, 63%, 1);
$medium-champagne: hsla(50, 66%, 80%, 1);
$bone: hsla(35, 24%, 80%, 1);
$bistre: hsla(28, 28%, 13%, 1); */

/* SCSS RGB */
/* $windsor-tan: rgba(168, 82, 25, 1);
$air-superiority-blue: rgba(128, 161, 193, 1);
$medium-champagne: rgba(238, 227, 171, 1);
$bone: rgba(217, 207, 193, 1);
$bistre: rgba(43, 33, 24, 1); */

/* SCSS Gradient */
/* $gradient-top: linear-gradient(0deg, #a85219ff, #80a1c1ff, #eee3abff, #d9cfc1ff, #2b2118ff);
$gradient-right: linear-gradient(90deg, #a85219ff, #80a1c1ff, #eee3abff, #d9cfc1ff, #2b2118ff);
$gradient-bottom: linear-gradient(180deg, #a85219ff, #80a1c1ff, #eee3abff, #d9cfc1ff, #2b2118ff);
$gradient-left: linear-gradient(270deg, #a85219ff, #80a1c1ff, #eee3abff, #d9cfc1ff, #2b2118ff);
$gradient-top-right: linear-gradient(45deg, #a85219ff, #80a1c1ff, #eee3abff, #d9cfc1ff, #2b2118ff);
$gradient-bottom-right: linear-gradient(135deg, #a85219ff, #80a1c1ff, #eee3abff, #d9cfc1ff, #2b2118ff);
$gradient-top-left: linear-gradient(225deg, #a85219ff, #80a1c1ff, #eee3abff, #d9cfc1ff, #2b2118ff);
$gradient-bottom-left: linear-gradient(315deg, #a85219ff, #80a1c1ff, #eee3abff, #d9cfc1ff, #2b2118ff);
$gradient-radial: radial-gradient(#a85219ff, #80a1c1ff, #eee3abff, #d9cfc1ff, #2b2118ff); */
