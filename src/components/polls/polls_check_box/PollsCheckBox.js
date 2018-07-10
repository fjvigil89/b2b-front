import React, { Component } from "react";
import PropTypes from "prop-types";
import { Body, Text, ListItem, Content, CheckBox } from "native-base";
import { connect } from "react-redux";
import { ChangeInput } from "@components/polls/PollsActions";

class PollsCheckBox extends Component {
  static propTypes = {
    ChangeInput: PropTypes.func.isRequired,
    data: PropTypes.oneOfType([PropTypes.any]),
    position: PropTypes.number
  };

  static defaultProps = {
    data: {},
    position: 0
  };

  state = {
    check: []
  };

  componentWillMount = () => {
    this.props.data.config.map(
      (item, index) => (this.state.check[index] = false)
    );
  };

  render = () => {
    const { data } = this.props;
    return (
      <Content>
        {data.config.map((item, index) => (
          <ListItem
            style={{ width: "90%" }}
            onTouchStart={() => {
              this.setState(state => {
                this.state.check[index] = !state.check[index];
                this.props.ChangeInput({
                  value: state.check,
                  position: this.props.position
                });
                return {
                  check: state.check
                };
              });
            }}
            key={`${data.index}${item.id}`}
          >
            <CheckBox
              checked={this.state.check[index]}
              /*
              onPress={() =>
                this.props.ChangeInput({ value: this.state.check, position })
              }
              */
            />
            <Body>
              <Text>{item.text}</Text>
            </Body>
          </ListItem>
        ))}
      </Content>
    );
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  ChangeInput
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollsCheckBox);
