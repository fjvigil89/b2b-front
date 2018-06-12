import React from "react";
import PropTypes from "prop-types";
import {
    Body,
    Text,
    ListItem,
    Content,
    CheckBox,
    View
  } from "native-base";


export default class PollsCheckBox extends React.Component {
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
    this.props.data.item.config.map( (item, index) => this.state.check[index] = false );
  }

  render() {
    const { data } = this.props;
    return (
        <Content>
            {
                data.item.config.map( (item, index) => 
                    {
                        return (<ListItem style={{width: '90%'}} onTouchStart={() => this.setState(state =>  {
                            this.state.check.map((ch, i) => this.state.check[i] = false );
                            this.state.check[index] = !state.check[index];
                            return {
                                check: state.check
                            }
                        } )} key={`${data.index}${item.id}`} >
                            <CheckBox checked={this.state.check[index]} />
                            <Body>
                                <Text>{item.text}</Text>
                            </Body>
                        </ListItem>);
                    }
                )
            }
        </Content>
    );
  }
}
