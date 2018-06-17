import React from "react";
import PropTypes from "prop-types";
import {
    Right,
    Left,
    Radio,
    Text,
    ListItem,
    Content,
    View,
    Textarea,
  } from "native-base";


export default class PollsRadio extends React.Component {
    static propTypes = {
        data: PropTypes.oneOfType([PropTypes.any]),
    };

    static defaultProps = { 
        data: {},
    };

  constructor(props) {
    super(props);

    this.state = { 
        check: []
    };
  }

  componentWillMount() { 
    this.props.data.item.config.map((item, index) => this.state.check[index] = false);
  }

  addTextArea = (item, state)=> {
    if(item.config.textArea && state === true){
        return <View style= {{margin: 10}}>
        <Textarea rowSpan={5}  bordered placeholder={item.config.title} />
    </View>
    }

    return null;
  }

  render() {
    const { data } = this.props;
    return (
        <Content>
            {
                data.item.config.map( (item, index) => 
                    {
                    return (
                        <View key={item.id}>
                            <ListItem style={{width: '90%'}} onTouchStart={() => this.setState(state =>  {
                                this.state.check.map((ch, i) => this.state.check[i] = false );
                                this.state.check[index] = !state.check[index];
                                return {
                                    check: state.check
                                }
                            } )} key={`${data.index}${item.id}`} >
                                <Left>
                                    <Text>{item.text}</Text>
                                </Left>
                                <Right>
                                    <Radio selected={this.state.check[index]} />
                                </Right>
                            </ListItem>
                            {this.addTextArea(item, this.state.check[index])}
                        </View>
                    )}
                )
            }
        </Content>
    );
  }
}
