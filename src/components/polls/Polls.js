import React, { Component } from "react";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import {
  Container,
  View,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Body,
  Right,
  Text,
  Card,
  CardItem,
  Textarea,
} from "native-base";

import { StyleSheet, FlatList } from "react-native";

import StepIndicator from 'react-native-step-indicator';
import SetCurrentPosition from "@components/polls/PollsActions";
import PollsCheckBox from "@components/polls/polls_check_box/PollsCheckBox";

const dummyData = [
  {
    step: 1,
    title: 'Usted está conforme con el desarrollo de B2B ?',
    type: 'textArea',
    config: []
  },
  {
    step: 2,
    title: 'Le gusta la fluides de la apps? ',
    type: 'radio',
    config: [
      {
        id: 14,
        text: 'Si'
      },
      {
        id: 2,
        text: 'No'
      }
    ]
  },
  {
    step: 3,
    title: 'Uffffffff? ',
    type: 'radio',
    config: [
      {
        id: 14,
        text: 'Si'
      },
      {
        id: 2,
        text: 'No'
      }
    ]
  },
  {
    step: 4,
    title: 'Cuantas personas? ',
    type: 'radio',
    config: [
      {
        id: 14,
        text: 'Si'
      },
      {
        id: 2,
        text: 'No'
      }
    ]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor:'#ffffff'
  },
  stepIndicator: {
    marginVertical:10,
    paddingHorizontal:10
  },
  rowItem: {
    flex:5,
    paddingVertical:30,
  },
  title: {
    flex: 1,
    fontSize:20,
    color:'#333333',
    paddingVertical:16,
    fontWeight:'600'
  },
  body: {
    flex: 1,
    fontSize:15,
    color:'#606060',
    lineHeight:24,
    marginRight:8
  }
});

const stepIndicatorStyles = {
  stepIndicatorSize: 0,
  currentStepIndicatorSize:20,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepIndicatorLabelFontSize: 5,
  currentStepIndicatorLabelFontSize: 0,
  labelSize: 0,
  stepStrokeCurrentColor: '#fe7013',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  currentStepLabelColor: '#fe7013'
}


class Polls extends Component {

  static propTypes = {
    SetCurrentPosition: PropTypes.func.isRequired,
    position: PropTypes.number
  };

  static defaultProps = {
    position: 0,
  };

  componentWillMount = () => {
  };

  onPageChange(position){
    console.log('posicion; ',position);
    this.props.SetCurrentPosition(position-1);
  }

  onViewableItemsChanged = ({ viewableItems}) => {
    console.log(viewableItems);
    const visibleItemsCount = viewableItems.length;
    if(visibleItemsCount !== 0) {
      this.props.SetCurrentPosition(viewableItems[visibleItemsCount-1].index);
    }
  }

  getContent = (data) => {
    if(data.item.type === 'textArea') {
        return <View style= {{margin: 10}}>
            <Textarea rowSpan={5}  bordered placeholder="Textarea" />
        </View>
    }

    return <PollsCheckBox data={data}/>
  }

  render = () => {
    const { position } = this.props;

    return (
      <Container>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>
          <Button transparent onPress={Actions.drawerOpen}>
              <Icon name="menu" />
          </Button>
          </Left>
          <Body>
          <Title>Encuestas</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>
            <View style={styles.stepIndicator}>
              <StepIndicator
                customStyles={stepIndicatorStyles}
                stepCount={dummyData.length}
                direction='vertical'
                currentPosition={position}
                // labels={dummyData.map(item => item)}
                />
            </View>
            <FlatList
              style={{flexGrow:1}}
              data={dummyData}
              renderItem={
                (data) => 
                <View style={styles.rowItem}>
                  <Card style={{width: '95%'}}>
                    <CardItem header>
                      <Text>{data.index + 1}) {data.item.title}</Text>
                    </CardItem>
                    {this.getContent(data)}
                    <CardItem footer>
                      <Text>{}</Text>
                    </CardItem>
                  </Card>
                  
                </View>
              } 
              onViewableItemsChanged={this.onViewableItemsChanged}
              // viewabilityConfig={{itemVisiblePercentThreshold: 40}}
              keyExtractor={item => item.title}
            />
        </View>
      </Container>
    );
  };
}


const mapStateToProps = state => ({
  position: state.polls.position,
});

const mapDispatchToProps = {
  SetCurrentPosition
};

export default connect(mapStateToProps, mapDispatchToProps)(Polls);